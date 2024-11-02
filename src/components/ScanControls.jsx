import React, { useState } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

function ScanControls({ onScan, scanning }) {
  const [splitDirs, setSplitDirs] = useState(false);
  const [force, setForce] = useState(false);

  const handleScan = () => {
    onScan({ splitDirs, force });
  };

  return (
    <div className="mb-6">
      <div className="flex items-center space-x-4 mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={splitDirs}
            onChange={(e) => setSplitDirs(e.target.checked)}
            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <span className="ml-2 text-sm text-gray-700">Split Directories</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={force}
            onChange={(e) => setForce(e.target.checked)}
            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <span className="ml-2 text-sm text-gray-700">Force Update</span>
        </label>
      </div>
      <button
        onClick={handleScan}
        disabled={scanning}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {scanning ? (
          <ArrowPathIcon className="animate-spin -ml-1 mr-2 h-5 w-5" />
        ) : (
          <ArrowPathIcon className="-ml-1 mr-2 h-5 w-5" />
        )}
        {scanning ? 'Scanning...' : 'Start Scan'}
      </button>
    </div>
  );
}

export default ScanControls;