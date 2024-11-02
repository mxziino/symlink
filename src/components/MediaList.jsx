import React from 'react';
import { FolderIcon, TrashIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { deleteSymlink, moveSymlink } from '../api';
import toast from 'react-hot-toast';

function MediaList({ media, onUpdate }) {
  const handleDelete = async (path) => {
    try {
      await deleteSymlink(path);
      toast.success('Symlink deleted');
      onUpdate();
    } catch (error) {
      toast.error('Failed to delete symlink');
    }
  };

  const handleMove = async (path, destination) => {
    try {
      await moveSymlink(path, destination);
      toast.success('Symlink moved');
      onUpdate();
    } catch (error) {
      toast.error('Failed to move symlink');
    }
  };

  const renderSection = (title, items, type) => (
    <div className="mb-8">
      <h2 className="text-lg font-medium mb-4">{title}</h2>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FolderIcon className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-sm font-medium text-gray-900">{item.name}</span>
              </div>
              <div className="flex space-x-2">
                {type === 'shows' && (
                  <button
                    onClick={() => handleMove(item.path, 'anime_shows')}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <ArrowPathIcon className="h-5 w-5" />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(item.path)}
                  className="text-red-600 hover:text-red-900"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
            {item.seasons && (
              <div className="mt-2 ml-8 text-sm text-gray-500">
                {item.seasons.map((season, idx) => (
                  <div key={idx}>{season}</div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      {renderSection('TV Shows', media.shows, 'shows')}
      {renderSection('Anime', media.animeShows, 'anime')}
      {renderSection('Movies', media.movies, 'movies')}
    </div>
  );
}

export default MediaList;