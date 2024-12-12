import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { OnboardingSurvey } from '@/types/onboarding';
import { CompanySection } from './sections/CompanySection';
import { ExperienceSection } from './sections/ExperienceSection';
import { FundingSection } from './sections/FundingSection';
import { SupportSection } from './sections/SupportSection';

interface SurveyStepProps {
  onComplete: () => void;
}

const initialSurveyData: OnboardingSurvey = {
  companyName: '',
  websiteUrl: '',
  linkedinUrl: '',
  buyerType: 'businessOwner',
  experience: 'basic',
  careerPhase: 'earlyCareer',
  fundingSources: [],
  supportNeeded: [],
  expectations: ''
};

export function SurveyStep({ onComplete }: SurveyStepProps) {
  const [surveyData, setSurveyData] = useState<OnboardingSurvey>(initialSurveyData);
  const [currentSection, setCurrentSection] = useState(0);

  const handleUpdateData = (data: Partial<OnboardingSurvey>) => {
    setSurveyData(prev => ({ ...prev, ...data }));
  };

  const sections = [
    {
      title: 'Company Information',
      component: <CompanySection data={surveyData} onUpdate={handleUpdateData} />
    },
    {
      title: 'Experience & Background',
      component: <ExperienceSection data={surveyData} onUpdate={handleUpdateData} />
    },
    {
      title: 'Funding Sources',
      component: <FundingSection data={surveyData} onUpdate={handleUpdateData} />
    },
    {
      title: 'Support & Expectations',
      component: <SupportSection data={surveyData} onUpdate={handleUpdateData} />
    }
  ];

  const isCurrentSectionValid = () => {
    switch (currentSection) {
      case 0:
        return surveyData.companyName.trim() !== '';
      case 1:
        return surveyData.buyerType && surveyData.experience && surveyData.careerPhase;
      case 2:
        return surveyData.fundingSources.length > 0;
      case 3:
        return surveyData.supportNeeded.length > 0;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-[#03012C]">Tell Us About Yourself</h2>
        <p className="mt-2 text-[#3B6064]">
          Help us understand your background and goals
        </p>
      </div>

      <div className="flex justify-between mb-8 max-md:justify-center max-md:relative">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`flex-1 ${index !== sections.length - 1 ? 'border-r border-[#3B6064]/20' : ''} 
              ${index === currentSection ? 'opacity-100' : 'opacity-50'}`}
          >
            <div className="px-4 max-md:px-2 text-center">
              <div className={`h-2 rounded-full mb-2 ${index < currentSection
                  ? 'bg-[#26A96C]'
                  : index === currentSection
                    ? 'bg-[#26A96C]/60'
                    : 'bg-[#3B6064]/20'
                }`} />
              <span className="text-sm max-md:text-[13px] font-medium text-[#03012C]">
                {section.title}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white/80 rounded-lg border border-[#3B6064]/20 p-6">
        {sections[currentSection].component}
      </div>

      <div className="flex justify-between pt-4">
        <Button
          variant="outline"
          onClick={() => setCurrentSection(prev => prev - 1)}
          disabled={currentSection === 0}
          className="border-[#3B6064]/20 hover:bg-[#F9F4F0] text-[#03012C]"
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={!isCurrentSectionValid()}
          className="bg-[#26A96C] hover:bg-[#26A96C]/90 text-white"
        >
          {currentSection === sections.length - 1 ? 'Complete' : 'Next'}
        </Button>
      </div>
    </div>
  );
}