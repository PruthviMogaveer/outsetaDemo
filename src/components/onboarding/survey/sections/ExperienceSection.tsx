import { OnboardingSurvey } from '@/types/onboarding';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface ExperienceSectionProps {
  data: OnboardingSurvey;
  onUpdate: (data: Partial<OnboardingSurvey>) => void;
}

export function ExperienceSection({ data, onUpdate }: ExperienceSectionProps) {
  const buyerTypes = [
    { value: 'businessOwner', label: 'Business Owner' },
    { value: 'searchingFullTime', label: 'Searching Full-Time' },
    { value: 'searchingPartTime', label: 'Searching Part-Time' },
    { value: 'searchingHobby', label: 'Searching as a Hobby' },
    { value: 'other', label: 'Other' }
  ];

  const experienceLevels = [
    { value: 'expert', label: 'Expert - Have bought/sold multiple businesses' },
    { value: 'advanced', label: 'Advanced - Have bought/sold one business' },
    { value: 'intermediate', label: 'Intermediate - Experienced in the process, but no deals closed' },
    { value: 'basic', label: 'Basic - Working to learn and build upon the fundamentals' }
  ];

  const careerPhases = [
    { value: 'recentGraduate', label: 'Recent Graduate' },
    { value: 'earlyCareer', label: 'Early Career Professional (0-5 years)' },
    { value: 'midCareer', label: 'Mid-Career Professional (5-15 years)' },
    { value: 'seniorProfessional', label: 'Senior Professional (15+ years)' },
    { value: 'lateCareer', label: 'Late Career/Recently Retired' },
    { value: 'militaryVeteran', label: 'Military Veteran Transitioning' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Label>Buyer Type</Label>
        <RadioGroup
          value={data.buyerType}
          onValueChange={(value) => onUpdate({ buyerType: value as OnboardingSurvey['buyerType'] })}
          className="space-y-2"
        >
          {buyerTypes.map((type) => (
            <div key={type.value} className="flex items-center space-x-2">
              <RadioGroupItem value={type.value} id={`buyerType-${type.value}`} />
              <Label htmlFor={`buyerType-${type.value}`} className="cursor-pointer">
                {type.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <Label>Business Buying Experience</Label>
        <RadioGroup
          value={data.experience}
          onValueChange={(value) => onUpdate({ experience: value as OnboardingSurvey['experience'] })}
          className="space-y-2"
        >
          {experienceLevels.map((level) => (
            <div key={level.value} className="flex items-center space-x-2">
              <RadioGroupItem value={level.value} id={`experience-${level.value}`} />
              <Label htmlFor={`experience-${level.value}`} className="cursor-pointer">
                {level.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <Label>Career Phase</Label>
        <RadioGroup
          value={data.careerPhase}
          onValueChange={(value) => onUpdate({ careerPhase: value as OnboardingSurvey['careerPhase'] })}
          className="space-y-2"
        >
          {careerPhases.map((phase) => (
            <div key={phase.value} className="flex items-center space-x-2">
              <RadioGroupItem value={phase.value} id={`careerPhase-${phase.value}`} />
              <Label htmlFor={`careerPhase-${phase.value}`} className="cursor-pointer">
                {phase.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}