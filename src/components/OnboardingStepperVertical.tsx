import React from "react";

const steps = [
  { label: "Welcome" },
  { label: "Company details" },
  { label: "Finish setup" },
];

export function OnboardingStepperVertical({ currentStep }: { currentStep: number }) {
  return (
    <ol className="space-y-8">
      {steps.map((step, idx) => {
        const isActive = idx + 1 === currentStep;
        const isCompleted = idx + 1 < currentStep;
        return (
          <li key={step.label} className="flex items-center">
            <div className={`flex items-center justify-center w-7 h-7 rounded-full border-2 transition-all duration-200
              ${isActive ? 'border-blue-600 bg-blue-50 text-blue-600 font-bold' : isCompleted ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300 bg-gray-100 text-gray-400'}`}
            >
              {isCompleted ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              ) : (
                idx + 1
              )}
            </div>
            <span className={`ml-4 text-base ${isActive ? 'text-blue-600 font-semibold' : isCompleted ? 'text-gray-500 line-through' : 'text-gray-400'}`}>{step.label}</span>
          </li>
        );
      })}
    </ol>
  );
}
