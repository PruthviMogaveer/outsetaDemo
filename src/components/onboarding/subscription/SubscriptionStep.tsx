import { useState } from "react";
import { Building2, Briefcase, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SubscriptionPlan } from "./SubscriptionPlan";
import type { SubscriptionPlan as SubscriptionPlanType } from "@/types/onboarding";

interface SubscriptionStepProps {
  onComplete: () => void;
  onPlanSelect: (plan: SubscriptionPlanType) => void;
}

const plans: SubscriptionPlanType[] = [
  {
    name: "Main Street",
    monthlyPrice: 49,
    icon: Building2,
    features: [
      "2 States included",
      "Up to $1M earnings",
      "All Matched Results",
      "AI Summaries",
      "One-Click Request",
    ],
    maxStates: 2,
    maxEarnings: 1000000,
  },
  {
    name: "Small Business",
    monthlyPrice: 79,
    icon: Building,
    features: [
      "4 States included",
      "Up to $2M earnings",
      "All Matched Results",
      "AI Summaries",
      "One-Click Request",
    ],
    maxStates: 4,
    maxEarnings: 2000000,
    popular: true,
  },
  {
    name: "Lower Middle Market",
    monthlyPrice: 119,
    icon: Briefcase,
    features: [
      "8 States included",
      "No earnings limit",
      "All Matched Results",
      "AI Summaries",
      "One-Click Request",
    ],
    maxStates: 8,
    maxEarnings: 5000000,
  },
];

export function SubscriptionStep({
  onComplete,
  onPlanSelect,
}: SubscriptionStepProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isAnnual, setIsAnnual] = useState(false);

  const handlePlanSelect = (planName: string) => {
    setSelectedPlan(planName);
    const plan = plans.find((p) => p.name === planName);
    if (plan) {
      onPlanSelect(plan);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-[#03012C]">
          Choose Your Plan
        </h2>
        <p className="mt-2 text-[#3B6064]">
          Select the plan that best fits your business acquisition goals
        </p>
      </div>

      <div className="flex justify-center mb-6">
        <div className="inline-flex bg-slate-200 rounded-lg p-1">
          <button
            className={`px-4 py-2 rounded-lg transition-colors ${
              !isAnnual
                ? "bg-[#26A96C] text-white"
                : "text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => setIsAnnual(false)}
          >
            Monthly
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition-colors ${
              isAnnual
                ? "bg-[#26A96C] text-white"
                : "text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => setIsAnnual(true)}
          >
            Annual (Two month free)
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {plans.map((plan) => (
          <SubscriptionPlan
            key={plan.name}
            {...plan}
            isAnnual={isAnnual}
            isSelected={selectedPlan === plan.name}
            onSelect={() => handlePlanSelect(plan.name)}
            popular={plan.popular}
          />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Button
          onClick={onComplete}
          disabled={!selectedPlan}
          className="bg-[#26A96C] hover:bg-[#26A96C]/90 text-white px-8"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
