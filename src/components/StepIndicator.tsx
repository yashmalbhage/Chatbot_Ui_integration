import React from 'react';
import { Check, Circle, CircleDot } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center space-x-4 mb-8">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <React.Fragment key={index}>
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index < currentStep
                  ? 'bg-blue-600 text-white'
                  : index === currentStep
                  ? 'bg-blue-100 text-blue-600 border-2 border-blue-600'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              {index < currentStep ? (
                <Check className="w-5 h-5" />
              ) : index === currentStep ? (
                <CircleDot className="w-5 h-5" />
              ) : (
                <Circle className="w-5 h-5" />
              )}
            </div>
          </div>
          {index < totalSteps - 1 && (
            <div
              className={`h-0.5 w-16 ${
                index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}