import { OnboardingSurvey } from '@/types/onboarding';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface FundingSectionProps {
  data: OnboardingSurvey;
  onUpdate: (data: Partial<OnboardingSurvey>) => void;
}

export function FundingSection({ data, onUpdate }: FundingSectionProps) {
  const fundingSources = [
    { value: 'personalFunds', label: 'Personal Funds' },
    { value: 'friendsFamily', label: 'Friends & Family' },
    { value: 'outsideInvestors', label: 'Outside Investors' },
    { value: 'sbaLoan', label: 'SBA 7a Loan' },
    { value: 'bankLoan', label: 'Traditional Bank Loan' },
    { value: 'sellerFinancing', label: 'Seller Financing' }
  ];

  const handleToggleFunding = (value: string) => {
    const currentSources = data.fundingSources || [];
    const newSources = currentSources.includes(value)
      ? currentSources.filter(source => source !== value)
      : [...currentSources, value];
    onUpdate({ fundingSources: newSources });
  };

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-base">How do you plan to fund your acquisition?</Label>
        <p className="text-sm text-[#3B6064] mt-1">Select all that apply</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {fundingSources.map((source) => (
          <div key={source.value} className="flex items-center space-x-3">
            <Checkbox
              id={source.value}
              checked={data.fundingSources.includes(source.value)}
              onCheckedChange={() => handleToggleFunding(source.value)}
              className="mt-0.5"
            />
            <Label
              htmlFor={source.value}
              className="text-[#3B6064] cursor-pointer leading-tight"
            >
              {source.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}