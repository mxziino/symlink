import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import MediaList from './components/MediaList';
import ScanControls from './components/ScanControls';
import StatusDisplay from './components/StatusDisplay';
import { fetchMedia, startScan, fetchStatus } from './api';

function App() {
  const [media, setMedia] = useState({ shows: [], animeShows: [], movies: [] });
  const [scanning, setScanning] = useState(false);
  const [status, setStatus] = useState({ messages: [] });

  useEffect(() => {
    loadMedia();
    const statusInterval = setInterval(checkStatus, 2000);
    return () => clearInterval(statusInterval);
  }, []);

  const loadMedia = async () => {
    try {
      const data = await fetchMedia();
      setMedia(data);
    } catch (error) {
      toast.error('Failed to load media');
    }
  };

  const checkStatus = async () => {
    if (scanning) {
      const currentStatus = await fetchStatus();
      setStatus(currentStatus);
      if (!currentStatus.running) {
        setScanning(false);
        loadMedia();
      }
    }
  };

  const handleScan = async (options) => {
    if (scanning) {
      toast.error('A scan is already running');
      return;
    }

    try {
      setScanning(true);
      await startScan(options);
      toast.success('Scan started');
    } catch (error) {
      toast.error('Failed to start scan');
      setScanning(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-bold mb-6">Symlink Manager</h1>
            
            <ScanControls 
              onScan={handleScan}
              scanning={scanning}
            />

            <StatusDisplay status={status} />

            <div className="border-t border-gray-200 pt-6">
              <MediaList 
                media={media}
                onUpdate={loadMedia}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;