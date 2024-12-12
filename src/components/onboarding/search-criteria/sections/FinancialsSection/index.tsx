import { SearchCriteria } from '@/types/onboarding';
import { Label } from '@/components/ui/label';
import { InfoIcon } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { EarningsRange } from './EarningsRange';
import { MarginRange } from './MarginRange';
import { AskingMultiple } from './AskingMultiple';

interface FinancialsSectionProps {
  data: SearchCriteria;
  onUpdate: (data: Partial<SearchCriteria>) => void;
  maxEarnings?: number;
}

export function FinancialsSection({ 
  data, 
  onUpdate,
  maxEarnings = 10000000 // Default to $10M if not specified
}: FinancialsSectionProps) {
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

  return (
    <div className="space-y-8">
      {/* Earnings Range */}
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <Label className="text-base">Earnings Range</Label>
            <p className="text-sm text-[#3B6064] mt-1">
              Set your ideal and absolute earnings range limits
            </p>
          </div>
          <Tooltip>
            <TooltipTrigger>
              <InfoIcon className="h-5 w-5 text-[#3B6064] cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              The range between your Ideal Min and Ideal Max earnings is your sweet spot. True Min and Max are your absolute limits.
            </TooltipContent>
          </Tooltip>
        </div>

        <EarningsRange
          floorMin={data.earnings.floorMin}
          floorIdeal={data.earnings.floorIdeal}
          ceilingIdeal={data.earnings.ceilingIdeal}
          ceilingMax={data.earnings.ceilingMax}
          onChange={handleEarningsChange}
          maxEarnings={maxEarnings}
        />
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
          <Tooltip>
            <TooltipTrigger>
              <InfoIcon className="h-5 w-5 text-[#3B6064] cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              Higher margins typically indicate better business health and efficiency
            </TooltipContent>
          </Tooltip>
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
          <Tooltip>
            <TooltipTrigger>
              <InfoIcon className="h-5 w-5 text-[#3B6064] cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              Lower multiples typically represent better value. This is the ratio of asking price to earnings.
            </TooltipContent>
          </Tooltip>
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