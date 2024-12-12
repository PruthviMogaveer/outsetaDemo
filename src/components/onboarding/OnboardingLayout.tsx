import { ReactNode } from 'react';
import { OnboardingProgress } from '@/types/onboarding';
import { OnboardingProgressBar } from './OnboardingProgressBar';

interface OnboardingLayoutProps {
  children: ReactNode;
  progress: OnboardingProgress;
}

export function OnboardingLayout({ children, progress }: OnboardingLayoutProps) {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <OnboardingProgressBar progress={progress} />
        <div className="mt-8 bg-white/80 rounded-lg shadow-lg p-6 border border-[#3B6064]/20">
          {children}
        </div>
      </div>
    </div>
  );
}