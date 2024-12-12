import { InfoTooltip } from '@/components/ui/info-tooltip';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface OneClickRequestProps {
  enabled: boolean;
  isValid: boolean;
  onChange: (enabled: boolean) => void;
}

export function OneClickRequest({ enabled, isValid, onChange }: OneClickRequestProps) {
  return (
    <div className="flex items-center justify-between ">
      <div className="space-y-0.5">
        <Label>One-Click Request</Label>
        <p className="text-sm text-[#3B6064]">
          Enable quick requests with your profile information
        </p>
      </div>
      <div className="flex items-center relative max-md:left-5">
        <Switch
          checked={enabled}
          onCheckedChange={onChange}
          disabled={!isValid}
        />
        <InfoTooltip content="Complete your profile to enable one-click requests." />
      </div>
    </div>
  );
}