import React from 'react';
import { FolderIcon, TrashIcon } from '@heroicons/react/24/outline';

function FileList({ files, onDelete }) {
  if (files.length === 0) {
    return (
      <p className="text-gray-500 text-center py-4">
        No symlinks created yet
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {files.map((file, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
        >
          <div className="flex items-center">
            <FolderIcon className="h-5 w-5 text-gray-400 mr-3" />
            <span className="text-sm text-gray-900">{file}</span>
          </div>
          <button
            onClick={() => onDelete(index)}
            className="p-2 text-red-600 hover:text-red-900"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default FileList;