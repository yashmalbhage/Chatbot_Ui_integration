import React, { useState } from 'react';
import { CheckCircle2, Clock, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
import type { WebpageStatus } from '../types';

const DUMMY_DATA: WebpageStatus[] = [
  {
    url: '/about',
    status: 'scraped',
    chunks: [
      'BeyondChats is a leading AI chatbot company.',
      'Founded in 2023, we help businesses automate customer support.',
      'Our mission is to revolutionize customer engagement.',
    ],
    lastUpdated: '2024-03-10T10:30:00Z',
  },
  {
    url: '/features',
    status: 'pending',
    lastUpdated: '2024-03-10T10:31:00Z',
  },
  {
    url: '/pricing',
    status: 'scraped',
    chunks: [
      'Flexible pricing plans for businesses of all sizes.',
      'Enterprise solutions available for large organizations.',
    ],
    lastUpdated: '2024-03-10T10:32:00Z',
  },
  {
    url: '/contact',
    status: 'failed',
    lastUpdated: '2024-03-10T10:33:00Z',
  },
];

interface WebpageScannerProps {
  onComplete: () => void;
}

export function WebpageScanner({ onComplete }: WebpageScannerProps) {
  const [expandedUrl, setExpandedUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 10;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getStatusIcon = (status: WebpageStatus['status']) => {
    switch (status) {
      case 'scraped':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  return (
    <div className="max-w-2xl w-full mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Website Scanning Progress</h2>
      
      <div className="mb-8">
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                Scanning Progress
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-blue-600">
                {progress}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
            <div
              style={{ width: `${progress}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="divide-y divide-gray-200">
          {DUMMY_DATA.map((webpage) => (
            <div key={webpage.url} className="p-4">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setExpandedUrl(expandedUrl === webpage.url ? null : webpage.url)}
              >
                <div className="flex items-center space-x-3">
                  {getStatusIcon(webpage.status)}
                  <span className="font-medium">{webpage.url}</span>
                </div>
                {webpage.chunks && (
                  <button className="text-gray-500">
                    {expandedUrl === webpage.url ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </button>
                )}
              </div>
              {expandedUrl === webpage.url && webpage.chunks && (
                <div className="mt-4 pl-8">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Scraped Content:</h4>
                  <ul className="space-y-2">
                    {webpage.chunks.map((chunk, index) => (
                      <li
                        key={index}
                        className="text-sm text-gray-600 bg-gray-50 p-2 rounded"
                      >
                        {chunk}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={onComplete}
          className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Continue to Integration
        </button>
      </div>
    </div>
  );
}