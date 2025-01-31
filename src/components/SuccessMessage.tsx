import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

interface SuccessMessageProps {
  type: 'success' | 'error';
  message: string;
  onClose?: () => void;
}

export function SuccessMessage({ type, message, onClose }: SuccessMessageProps) {
  return (
    <div className={`fixed top-4 right-4 max-w-sm w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg pointer-events-auto ring-1 ${
      type === 'success' ? 'ring-green-500' : 'ring-red-500'
    }`}>
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {type === 'success' ? (
              <CheckCircle2 className="h-6 w-6 text-green-400" />
            ) : (
              <XCircle className="h-6 w-6 text-red-400" />
            )}
          </div>
          <div className="ml-3 w-0 flex-1">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{message}</p>
          </div>
          {onClose && (
            <div className="ml-4 flex-shrink-0 flex">
              <button
                className="bg-white dark:bg-gray-800 rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={onClose}
              >
                <span className="sr-only">Close</span>
                <XCircle className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}