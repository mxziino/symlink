import React from 'react';
import { FolderIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

function FolderSelector({ selectedFolder, onFolderSelect, onCreateSymlinks, loading }) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Source Folder
      </label>
      <div className="flex gap-4">
        <input
          type="text"
          value={selectedFolder}
          onChange={onFolderSelect}
          placeholder="/path/to/folder"
          className="flex-1 rounded-md border border-gray-300 shadow-sm px-4 py-2"
        />
        <button
          onClick={onCreateSymlinks}
          disabled={loading}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {loading ? (
            <ArrowPathIcon className="animate-spin -ml-1 mr-2 h-5 w-5" />
          ) : (
            <FolderIcon className="-ml-1 mr-2 h-5 w-5" />
          )}
          Create Symlinks
        </button>
      </div>
    </div>
  );
}

export default FolderSelector;