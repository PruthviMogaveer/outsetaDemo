import { OnboardingSurvey } from '@/types/onboarding';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CompanySectionProps {
  data: OnboardingSurvey;
  onUpdate: (data: Partial<OnboardingSurvey>) => void;
}

export function CompanySection({ data, onUpdate }: CompanySectionProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="companyName">Company Name</Label>
        <Input
          id="companyName"
          value={data.companyName}
          onChange={(e) => onUpdate({ companyName: e.target.value })}
          placeholder="Enter your company name"
          className="h-11"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="websiteUrl">Website URL (Optional)</Label>
        <Input
          id="websiteUrl"
          value={data.websiteUrl}
          onChange={(e) => onUpdate({ websiteUrl: e.target.value })}
          placeholder="https://example.com"
          className="h-11"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="linkedinUrl">LinkedIn URL (Optional)</Label>
        <Input
          id="linkedinUrl"
          value={data.linkedinUrl}
          onChange={(e) => onUpdate({ linkedinUrl: e.target.value })}
          placeholder="https://linkedin.com/in/username"
          className="h-11"
        />
      </div>
    </div>
  );
}