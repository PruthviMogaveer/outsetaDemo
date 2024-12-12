import { SearchCriteria } from "@/types/onboarding";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { InfoIcon } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface AttributesSectionProps {
  data: SearchCriteria;
  onUpdate: (data: Partial<SearchCriteria>) => void;
}

export function AttributesSection({ data, onUpdate }: AttributesSectionProps) {
  return (
    <div className="space-y-8 mt-8">
      {/* Years in Business */}
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <Label className="text-base">Years in Business</Label>
            <p className="text-sm text-[#3B6064] mt-1">
              Set minimum requirements for business age
            </p>
          </div>
          <Tooltip>
            <TooltipTrigger>
              <InfoIcon className="h-5 w-5 text-[#3B6064] cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              Older businesses typically have more stable operations and
              financials
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm text-[#3B6064]">True Minimum</Label>
            <Input
              type="number"
              min={0}
              value={data.yearsInBusiness.trueMin}
              onChange={(e) =>
                onUpdate({
                  yearsInBusiness: {
                    ...data.yearsInBusiness,
                    trueMin: Number(e.target.value),
                  },
                })
              }
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-[#3B6064]">Ideal Minimum</Label>
            <Input
              type="number"
              min={data.yearsInBusiness.trueMin}
              value={data.yearsInBusiness.idealMin}
              onChange={(e) =>
                onUpdate({
                  yearsInBusiness: {
                    ...data.yearsInBusiness,
                    idealMin: Number(e.target.value),
                  },
                })
              }
              className="h-11"
            />
          </div>
        </div>
      </div>

      {/* Employees */}
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <Label className="text-base">Number of Employees</Label>
            <p className="text-sm text-[#3B6064] mt-1">
              Set minimum employee requirements
            </p>
          </div>
          <Tooltip>
            <TooltipTrigger>
              <InfoIcon className="h-5 w-5 text-[#3B6064] cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              Consider management requirements and operational complexity
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm text-[#3B6064]">True Minimum</Label>
            <Input
              type="number"
              min={0}
              value={data.employees.trueMin}
              onChange={(e) =>
                onUpdate({
                  employees: {
                    ...data.employees,
                    trueMin: Number(e.target.value),
                  },
                })
              }
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-[#3B6064]">Ideal Minimum</Label>
            <Input
              type="number"
              min={data.employees.trueMin}
              value={data.employees.idealMin}
              onChange={(e) =>
                onUpdate({
                  employees: {
                    ...data.employees,
                    idealMin: Number(e.target.value),
                  },
                })
              }
              className="h-11"
            />
          </div>
        </div>
      </div>

      {/* Quality Filter */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base">Quality Filter</Label>
            <p className="text-sm text-[#3B6064] mt-1">
              Filter out potentially low-quality listings
            </p>
          </div>
          <Switch
            checked={data.excludePoorQuality}
            onCheckedChange={(checked) =>
              onUpdate({ excludePoorQuality: checked })
            }
          />
        </div>
        <p className="text-sm text-[#3B6064]">
          When enabled, listings with poor descriptions, missing key
          information, or other quality issues will be filtered out. Disable
          this if you want to see all possible opportunities, including
          potential diamonds in the rough.
        </p>
      </div>
    </div>
  );
}
