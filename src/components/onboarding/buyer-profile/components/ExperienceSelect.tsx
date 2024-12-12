import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface ExperienceSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function ExperienceSelect({ value, onChange }: ExperienceSelectProps) {
  return (
    <div className="space-y-4">
      <Label>Experience Level *</Label>
      <RadioGroup
        value={value}
        onValueChange={onChange}
        className="space-y-2"
      >
        {[
          { value: 'none', label: 'Never bought/sold businesses' },
          { value: 'upToFive', label: 'Bought/sold up to 5 businesses' },
          { value: 'moreThanFive', label: 'Bought/sold more than 5 businesses' }
        ].map((level) => (
          <div key={level.value} className="flex items-center space-x-2">
            <RadioGroupItem value={level.value} id={`level-${level.value}`} />
            <Label htmlFor={`level-${level.value}`}>{level.label}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}