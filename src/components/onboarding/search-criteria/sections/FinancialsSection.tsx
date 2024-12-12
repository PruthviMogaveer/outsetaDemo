import { SearchCriteria } from '@/types/onboarding';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { InfoTooltip } from '@/components/ui/info-tooltip';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { MarginRange } from './FinancialsSection/MarginRange';
import { AskingMultiple } from './FinancialsSection/AskingMultiple';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface FinancialsSectionProps {
  data: SearchCriteria;
  onUpdate: (data: Partial<SearchCriteria>) => void;
  maxEarnings: number;
}

export function FinancialsSection({ data, onUpdate, maxEarnings }: FinancialsSectionProps) {
  const handleEarningsChange = (field: keyof SearchCriteria['earnings'], value: number) => {
    onUpdate({
      earnings: {
        ...data.earnings,
        [field]: value
      }
    });
  };

  const handleAskingMultipleChange = (field: keyof SearchCriteria['askingMultiple'], value: number) => {
    onUpdate({
      askingMultiple: {
        ...data.askingMultiple,
        [field]: value
      }
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="space-y-8">
      {/* Earnings Range */}
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <Label className="text-base">Earnings Range</Label>
            <p className="text-sm text-[#3B6064] mt-1">
              Set your ideal and absolute earnings range limits up to {formatCurrency(maxEarnings)}
            </p>
          </div>
          <InfoTooltip content="The range between your Ideal Min and Ideal Max earnings is your sweet spot. True Min and Max are your absolute limits." />
        </div>

        {data.earnings.ceilingMax > maxEarnings && (
          <Alert variant="warning" className="bg-amber-50 border-amber-200">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-600">
              Your maximum earnings exceed the limit of {formatCurrency(maxEarnings)} for your plan.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-8">
          <div className="space-y-4">
            <Label>Floor (Minimum)</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm text-[#3B6064]">True Minimum</Label>
                <Input
                  type="number"
                  min={0}
                  max={data.earnings.floorIdeal}
                  value={data.earnings.floorMin}
                  onChange={(e) => handleEarningsChange('floorMin', Number(e.target.value))}
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-[#3B6064]">Ideal Minimum</Label>
                <Input
                  type="number"
                  min={data.earnings.floorMin}
                  max={data.earnings.ceilingIdeal}
                  value={data.earnings.floorIdeal}
                  onChange={(e) => handleEarningsChange('floorIdeal', Number(e.target.value))}
                  className="h-11"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Ceiling (Maximum)</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm text-[#3B6064]">Ideal Maximum</Label>
                <Input
                  type="number"
                  min={data.earnings.floorIdeal}
                  max={data.earnings.ceilingMax}
                  value={data.earnings.ceilingIdeal}
                  onChange={(e) => handleEarningsChange('ceilingIdeal', Number(e.target.value))}
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-[#3B6064]">True Maximum</Label>
                <Input
                  type="number"
                  min={data.earnings.ceilingIdeal}
                  max={maxEarnings}
                  value={data.earnings.ceilingMax}
                  onChange={(e) => handleEarningsChange('ceilingMax', Number(e.target.value))}
                  className="h-11"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Earnings Margin */}
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <Label className="text-base">Earnings Margin</Label>
            <p className="text-sm text-[#3B6064] mt-1">
              Set your minimum acceptable margin percentage
            </p>
          </div>

          <InfoTooltip content="Higher margins typically indicate better business health and efficiency" />


        </div>

        <MarginRange
          marginMin={data.earnings.marginMin}
          marginIdeal={data.earnings.marginIdeal}
          onChange={handleEarningsChange}
        />
      </div>

      {/* Asking Multiple */}
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <Label className="text-base">Asking Multiple</Label>
            <p className="text-sm text-[#3B6064] mt-1">
              Set your target and maximum acceptable multiples
            </p>
          </div>
          <InfoTooltip content="Lower multiples typically represent better value. This is the ratio of asking price to earnings." />


        </div>

        <AskingMultiple
          ideal={data.askingMultiple.ideal}
          max={data.askingMultiple.max}
          onChange={handleAskingMultipleChange}
        />
      </div>
    </div>
  );
}