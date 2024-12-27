import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SearchCriteria, SubscriptionPlan } from '@/types/onboarding';
import { LocationSection } from './sections/LocationSection';
import { FinancialsSection } from './sections/FinancialsSection';
import { IndustrySection } from './sections/IndustrySection';
import { AttributesSection } from './sections/AttributesSection';

interface SearchCriteriaStepProps {
  onComplete: () => void;
  selectedPlan: SubscriptionPlan | null;
}

const initialCriteria: SearchCriteria = {
  location: {
    states: [],
    priorityMetros: [],
    excludedMetros: []
  },
  earnings: {
    floorMin: 0,
    floorIdeal: 0,
    ceilingIdeal: 0,
    ceilingMax: 0,
    marginIdeal: 0,
    marginMin: 0
  },
  askingMultiple: {
    ideal: 3,
    max: 5
  },
  industry: {
    categories: [],
    subcategories: []
  },
  businessTags: [],
  franchise: 'non-franchise',
  yearsInBusiness: {
    idealMin: 0,
    trueMin: 0
  },
  employees: {
    idealMin: 0,
    trueMin: 0
  },
  excludePoorQuality: false
};

export function SearchCriteriaStep({ onComplete, selectedPlan }: SearchCriteriaStepProps) {
  const [criteria, setCriteria] = useState<SearchCriteria>(initialCriteria);
  const [currentSection, setCurrentSection] = useState(0);

  const handleUpdateCriteria = (data: Partial<SearchCriteria>) => {
    setCriteria(prev => ({ ...prev, ...data }));
  };

  const sections = [
    {
      title: 'Location',
      component: (
        <LocationSection 
          data={criteria} 
          onUpdate={handleUpdateCriteria}
          maxStates={selectedPlan?.maxStates || 2}
        />
      )
    },
    {
      title: 'Financials',
      component: (
        <FinancialsSection 
          data={criteria} 
          onUpdate={handleUpdateCriteria}
          maxEarnings={selectedPlan?.maxEarnings || 1000000}
        />
      )
    },
    {
      title: 'Industry',
      component: <IndustrySection data={criteria} onUpdate={handleUpdateCriteria} />
    },
    {
      title: 'Attributes',
      component: <AttributesSection data={criteria} onUpdate={handleUpdateCriteria} />
    }
  ];

  const isCurrentSectionValid = () => {
    switch (currentSection) {
      case 0:
        return criteria.location.states.length > 0 && 
               criteria.location.states.length <= (selectedPlan?.maxStates || 2);
      case 1:
        const maxEarnings = selectedPlan?.maxEarnings || 1000000;
        return criteria.earnings.floorMin <= criteria.earnings.floorIdeal &&
               criteria.earnings.floorIdeal <= criteria.earnings.ceilingIdeal &&
               criteria.earnings.ceilingIdeal <= criteria.earnings.ceilingMax &&
               criteria.earnings.ceilingMax <= maxEarnings;
      case 2:
        return criteria.industry.categories.length > 0;
      case 3:
        return true;
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
        <h2 className="text-2xl font-semibold text-[#03012C]">Search Criteria</h2>
        <p className="mt-2 text-[#3B6064]">
          Define your ideal business characteristics
        </p>
      </div>

      <div className="flex justify-between mb-8 max-md:justify-center max-md:relative">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`flex-1 ${index !== sections.length - 1 ? 'border-r border-[#3B6064]/20' : ''}`}
          >
            <div className="px-4 max-md:px-3 text-center">
              <div className={`h-2 rounded-full mb-2 ${
                index < currentSection 
                  ? 'bg-[#26A96C]' 
                  : index === currentSection 
                    ? 'bg-[#26A96C]/60' 
                    : 'bg-[#3B6064]/20'
              }`} />
              <span className="text-sm max-md:text-[14px] font-medium text-[#03012C]">
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
          {currentSection === sections.length - 1 ? 'Next Step' : 'Next'}
        </Button>
      </div>
    </div>
  );
}