import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronRight, Target, DollarSign, Building2, Users } from 'lucide-react';
import type { SubscriptionPlan } from '@/types/onboarding';

interface SearchIntroStepProps {
  onComplete: () => void;
  selectedPlan: SubscriptionPlan | null;
}

export function SearchIntroStep({ onComplete, selectedPlan }: SearchIntroStepProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: Target,
      title: 'Location Strategy',
      description: `Define your target markets and geographic preferences. Choose up to ${selectedPlan?.maxStates || 2} states and prioritize specific metro areas to focus your search.`,
      tips: [
        `Select up to ${selectedPlan?.maxStates || 2} states based on your ${selectedPlan?.name || ''} plan`,
        'Prioritize specific metro areas within those states',
        "Exclude areas that don't fit your criteria"
      ]
    },
    {
      icon: DollarSign,
      title: 'Financial Criteria',
      description: `Set your ideal financial parameters including earnings ranges up to ${selectedPlan?.maxEarnings ? `$${selectedPlan.maxEarnings.toLocaleString()}` : '$1M'} and asking price multiples.`,
      tips: [
        'Define minimum and maximum earnings thresholds',
        'Set target profit margins',
        'Specify acceptable asking price multiples'
      ]
    },
    {
      icon: Building2,
      title: 'Industry Focus',
      description: 'Choose industries that align with your experience and interests. Our matching system uses these preferences to find relevant opportunities.',
      tips: [
        'Select broad industry categories',
        'Specify sub-industries of interest',
        'Include or exclude franchise opportunities'
      ]
    },
    {
      icon: Users,
      title: 'Business Attributes',
      description: 'Define key business characteristics like size, age, and operational requirements that match your management style and goals.',
      tips: [
        'Specify employee count ranges',
        'Set minimum years in business',
        'Define owner involvement preferences'
      ]
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-[#03012C]">Understanding Search Criteria</h2>
        <p className="mt-2 text-[#3B6064]">
          Learn how we'll use your preferences to find the perfect business match
        </p>
      </div>

      <div className="flex justify-between mb-8">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`flex-1 ${index !== slides.length - 1 ? 'border-r border-[#3B6064]/20' : ''}`}
          >
            <div className="px-4">
              <div className={`h-2 rounded-full transition-colors ${
                index <= currentSlide ? 'bg-[#26A96C]' : 'bg-[#3B6064]/20'
              }`} />
            </div>
          </div>
        ))}
      </div>

      <Card className="bg-white/80 border-[#3B6064]/20 p-6">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`space-y-6 transition-opacity duration-300 ${
                index === currentSlide ? 'opacity-100' : 'hidden opacity-0'
              }`}
            >
              <div className="inline-flex p-3 rounded-full bg-[#26A96C]/10">
                <slide.icon className="w-8 h-8 text-[#26A96C]" />
              </div>
              
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-[#03012C]">{slide.title}</h3>
                <p className="text-[#3B6064]">{slide.description}</p>
              </div>

              <div className="bg-color/10 rounded-lg p-4">
                <h4 className="font-medium text-[#03012C] mb-3">Key Tips:</h4>
                <ul className="space-y-2">
                  {slide.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start space-x-2 text-sm text-[#3B6064]">
                      <ChevronRight className="w-4 h-4 text-[#26A96C] mt-0.5 flex-shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="flex justify-between pt-4">
        <Button
          variant="outline"
          onClick={() => setCurrentSlide(prev => prev - 1)}
          disabled={currentSlide === 0}
          className="border-[#3B6064]/20 hover:bg-[#F9F4F0] text-[#03012C]"
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          className="bg-[#26A96C] hover:bg-[#26A96C]/90 text-white"
        >
          {currentSlide === slides.length - 1 ? 'Start Setting Criteria' : 'Next'}
        </Button>
      </div>
    </div>
  );
}