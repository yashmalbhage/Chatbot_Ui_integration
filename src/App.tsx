import React, { useState, useEffect } from 'react';
import { AuthForm } from './components/AuthForm';
import { OrganizationForm } from './components/OrganizationForm';
import { WebpageScanner } from './components/WebpageScanner';
import { ChatbotIntegration } from './components/ChatbotIntegration';
import { StepIndicator } from './components/StepIndicator';
import { SuccessMessage } from './components/SuccessMessage';
import { ChatbotTest } from './components/ChatbotTest';
import { ThemeToggle } from './components/ThemeToggle';
import { LandingPage } from './components/LandingPage';

function App() {
  const [currentStep, setCurrentStep] = useState(-1); // -1 for landing page
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showChatbot, setShowChatbot] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const handleStepComplete = () => {
    setSuccessMessage('Step completed successfully!');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    setCurrentStep((prev) => prev + 1);
  };

  const handleGetStarted = () => {
    setCurrentStep(0);
  };

  const renderStep = () => {
    if (currentStep === -1) {
      return <LandingPage onGetStarted={handleGetStarted} />;
    }

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
            <StepIndicator currentStep={currentStep} totalSteps={5} />
            {currentStep === 0 && <AuthForm onComplete={handleStepComplete} />}
            {currentStep === 1 && <OrganizationForm onComplete={handleStepComplete} />}
            {currentStep === 2 && (
              <WebpageScanner
                onComplete={() => {
                  // setShowChatbot(true);
                  handleStepComplete();
                }}
              />
            )}
            {currentStep === 3 && <ChatbotIntegration onComplete={handleStepComplete} />}
            {currentStep === 4 && <ChatbotTest onComplete={handleStepComplete} />}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative">
      <ThemeToggle isDark={isDarkMode} onToggle={() => setIsDarkMode(!isDarkMode)} />
      {renderStep()}
      {showSuccess && (
        <SuccessMessage
          type="success"
          message={successMessage}
          onClose={() => setShowSuccess(false)}
        />
      )}
      {showChatbot && <ChatbotTest />}
    </div>
  );
}

export default App;