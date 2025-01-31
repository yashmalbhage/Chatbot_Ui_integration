import React, { useState } from 'react';
import { Code, Mail, ExternalLink, Share2, CheckCircle2 } from 'lucide-react';

interface ChatbotIntegrationProps {
  onComplete: () => void;
}

export function ChatbotIntegration({ onComplete }: ChatbotIntegrationProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [integrationMethod, setIntegrationMethod] = useState<string | null>(null);

  const dummyCode = `<script>
  window.BEYONDCHATS_CONFIG = {
    apiKey: 'your-api-key',
    organizationId: 'your-org-id'
  };
</script>
<script src="https://cdn.beyondchats.com/widget.js" async></script>`;

  const handleTestIntegration = () => {
    setShowSuccess(true);
  };

  return (
    <div className="max-w-2xl w-full mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Chatbot Integration</h2>

      {!showSuccess ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={onComplete}
              className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <ExternalLink className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-lg font-medium mb-2 dark:text-white">Test Chatbot</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Preview your chatbot on a test page before integration
              </p>
            </button>

            <button
              onClick={() => {
                setIntegrationMethod('integrate');
              }}
              className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <Code className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-lg font-medium mb-2 dark:text-white">Integrate on Website</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Get the code snippet or send instructions to your developer
              </p>
            </button>
          </div>

          {integrationMethod === 'integrate' && (
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4 dark:text-white">Integration Options</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                      <h4 className="font-medium mb-2 dark:text-white">Copy Code Snippet</h4>
                      <div className="bg-gray-800 text-gray-200 p-4 rounded-md">
                        <pre className="text-sm overflow-x-auto">{dummyCode}</pre>
                      </div>
                      <button className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                        Copy Code
                      </button>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                      <h4 className="font-medium mb-2 dark:text-white">Email Instructions</h4>
                      <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                        <Mail className="h-4 w-4 mr-2" />
                        Send to Developer
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleTestIntegration}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                >
                  Test Integration
                </button>
              </div>
            </div>
          )}
         

        </div>
      ) : (
        <div className="text-center">
          <div className="mb-8">
            <div className="mx-auto w-24 h-24 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="mt-4 text-2xl font-medium text-gray-900 dark:text-white">
              Integration Successful!
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Your chatbot is now ready to engage with your customers
            </p>
          </div>

          <div className="space-y-4">
            <button
             
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Explore Admin Panel
            </button>
            
            <button 
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
            >
              Start Talking to Your Chatbot
            </button>

            <div className="flex justify-center space-x-4">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <Share2 className="h-4 w-4 mr-2" />
                Share on Twitter
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <Share2 className="h-4 w-4 mr-2" />
                Share on LinkedIn
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}