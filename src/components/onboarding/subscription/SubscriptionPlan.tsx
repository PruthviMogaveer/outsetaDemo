import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlanProps {
  name: string;
  monthlyPrice: number;
  icon: LucideIcon;
  features: string[];
  maxStates: number;
  maxEarnings: number;
  popular?: boolean;
  isSelected: boolean;
  onSelect: () => void;
  isAnnual: boolean;
}

export function SubscriptionPlan({
  name,
  monthlyPrice,
  icon: Icon,
  features,
  isSelected,
  onSelect,
  isAnnual,
  popular,
}: PlanProps) {
  const price = isAnnual
    ? Math.round(monthlyPrice * 0.8) // 20% discount for annual
    : monthlyPrice;

    const anualPrice = Math.round(monthlyPrice * 10); //two month free

  return (
    <div
      className={cn(
        "relative rounded-lg border-2 p-6 cursor-pointer transition-all",
        isSelected
          ? "border-[#26A96C] bg-[#26A96C]/5"
          : "border-[#3B6064]/20 hover:border-[#26A96C]/50 bg-white/80"
      )}
      onClick={onSelect}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-[#26A96C] text-white text-xs font-semibold px-3 py-1 rounded-full">
            Popular
          </span>
        </div>
      )}

      <div className="text-center mb-6">
        <div className="inline-block p-3 bg-[#F9F4F0] rounded-full mb-4">
          <Icon className="w-6 h-6 text-[#26A96C]" />
        </div>
        <h3 className="text-xl font-semibold text-[#03012C] mb-2">{name}</h3>
        <div className="text-[#3B6064]">
          <span className="text-2xl font-bold text-[#03012C]">${price}</span>
          {isAnnual ? (
            <>
              <span>/month</span>
           
              <span className="ml-2 text-sm text-[#26A96C] block">
                {" "}
                ${anualPrice} paid anually
              </span>
            </>
          ) : (
            <span>/month</span>
          )}
        </div>
        {isAnnual && (
          <div className="text-xs text-[#26A96C] mt-1">
            Get two month free benifit
          </div>
        )}
      </div>

      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="w-5 h-5 text-[#26A96C] mr-2 flex-shrink-0 mt-0.5" />
            <span className="text-[#3B6064]">{feature}</span>
          </li>
        ))}
      </ul>

      <div
        className={cn(
          "mt-6 py-2 text-center rounded-lg border transition-colors",
          isSelected
            ? "bg-[#26A96C] text-white border-[#26A96C]"
            : "bg-white text-[#03012C] border-[#3B6064]/20 hover:border-[#26A96C]"
        )}
      >
        {isSelected ? "Selected" : "Select Plan"}
      </div>
    </div>
  );
}
