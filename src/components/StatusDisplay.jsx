import React from 'react';

function StatusDisplay({ status }) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Status Messages</h3>
      <div className="bg-gray-50 rounded-lg p-4 h-32 overflow-y-auto">
        {status.messages.map((message, index) => (
          <div key={index} className="text-sm text-gray-600">
            {message}
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatusDisplay;