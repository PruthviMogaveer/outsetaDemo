import { OnboardingProgress, OnboardingStep } from '@/types/onboarding';
import { CheckCircle2, Circle } from 'lucide-react';

const steps: { key: OnboardingStep; label: string }[] = [
  { key: 'subscription', label: 'Subscription' },
  { key: 'survey', label: 'Survey' },
  { key: 'searchIntro', label: 'Search Info' },
  { key: 'searchCriteria', label: 'Search Criteria' },
  { key: 'buyerProfile', label: 'Buyer Profile' },
];

interface OnboardingProgressBarProps {
  progress: OnboardingProgress;
}

export function OnboardingProgressBar({ progress }: OnboardingProgressBarProps) {
  const currentStepIndex = steps.findIndex(step => step.key === progress.currentStep);

  return (
    <div className="relative">
      <div className="relative content-center  top-5 max-md:top-4 left-9 right-0 h-0.5 bg-black/10 w-[91.5%] max-md:w-[80%]">
        <div
          className="absolute h-full bg-[#26A96C] transition-all duration-500"
          style={{
            width: `${(currentStepIndex / (steps.length - 1)) * 100}%`
          }}
        />
      </div>

      <div className="relative flex justify-between max-md:space-x-4">
        {steps.map((step) => {
          const isCompleted = progress.completedSteps.includes(step.key);
          const isCurrent = progress.currentStep === step.key;

          return (
            <div
              key={step.key}
              className="flex flex-col items-center"
            >
              <div className={`
                w-10 h-10 max-md:w-8 max-md:h-8 rounded-full flex items-center justify-center 
                transition-colors duration-200
                ${isCompleted ? 'bg-[#26A96C]' : isCurrent ? 'bg-[#26A96C]/80' : 'bg-secondary'}
              `}>
                {isCompleted ? (
                  <CheckCircle2 className="max-md:w-5 max-md:h-5 w-6 h-6 text-white" />
                ) : (
                  <Circle className={`max-md:w-5 max-md:h-5 w-6 h-6 ${isCurrent ? 'text-white' : 'text-white'}`} />
                )}
              </div>
              <span className={`
                mt-2 max-md:text-xs text-sm font-medium text-center
                ${isCompleted ? 'text-[#26A96C]' : isCurrent ? 'text-[#03012C]' : 'text-[#3B6064]'}
              `}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}