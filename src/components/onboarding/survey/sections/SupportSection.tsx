import { OnboardingSurvey } from '@/types/onboarding';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';

interface SupportSectionProps {
  data: OnboardingSurvey;
  onUpdate: (data: Partial<OnboardingSurvey>) => void;
}

export function SupportSection({ data, onUpdate }: SupportSectionProps) {
  const supportOptions = [
    { value: 'dealReview', label: 'Pre-LOI Deal Review & Analysis' },
    { value: 'dealStructuring', label: 'Deal Structuring & Negotiation Support' },
    { value: 'sbaSupport', label: 'SBA Loan Support' },
    { value: 'professionalServices', label: 'Professional Services (Legal, Financial, etc.)' },
    { value: 'businessPlan', label: 'Business Plan Support' },
    { value: 'investorIntros', label: 'Investor Introductions' }
  ];

  const handleToggleSupport = (value: string) => {
    const currentSupport = data.supportNeeded || [];
    const newSupport = currentSupport.includes(value)
      ? currentSupport.filter(item => item !== value)
      : [...currentSupport, value];
    onUpdate({ supportNeeded: newSupport });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div>
          <Label className="text-base">What additional support would you be interested in?</Label>
          <p className="text-sm text-[#3B6064] mt-1">Select all that apply</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {supportOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-3">
              <Checkbox
                id={option.value}
                checked={data.supportNeeded.includes(option.value)}
                onCheckedChange={() => handleToggleSupport(option.value)}
                className="mt-0.5"
              />
              <Label
                htmlFor={option.value}
                className="text-[#3B6064] cursor-pointer leading-tight"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Label htmlFor="expectations">
          What are you most looking forward to with Search Assistant?
        </Label>
        <Textarea
          id="expectations"
          value={data.expectations}
          onChange={(e) => onUpdate({ expectations: e.target.value })}
          placeholder="Share your thoughts..."
          className="min-h-[100px] resize-none"
        />
      </div>
    </div>
  );
}