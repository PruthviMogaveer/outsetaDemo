import { SearchCriteria } from '@/types/onboarding';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { InfoIcon } from 'lucide-react';
import { Tooltip } from '@/components/ui/tooltip';
import { InfoTooltip } from '@/components/ui/info-tooltip';

interface IndustrySectionProps {
  data: SearchCriteria;
  onUpdate: (data: Partial<SearchCriteria>) => void;
}

const industries = {
  'Technology': [
    'Software & SaaS',
    'IT Services',
    'E-commerce',
    'Digital Media',
  ],
  'Healthcare': [
    'Medical Practices',
    'Healthcare Services',
    'Medical Equipment',
    'Wellness & Fitness',
  ],
  'Manufacturing': [
    'Industrial Manufacturing',
    'Consumer Goods',
    'Food & Beverage',
    'Automotive',
  ],
  'Services': [
    'Professional Services',
    'Business Services',
    'Personal Services',
    'Educational Services',
  ],
};

export function IndustrySection({ data, onUpdate }: IndustrySectionProps) {
  const handleCategoryChange = (category: string, checked: boolean) => {
    const currentCategories = new Set(data.industry.categories);

    if (checked) {
      currentCategories.add(category);
    } else {
      currentCategories.delete(category);
    }

    onUpdate({
      industry: {
        categories: Array.from(currentCategories),
        subcategories: data.industry.subcategories
      }
    });
  };

  const handleSubcategoryChange = (category: string, subcategory: string, checked: boolean) => {
    const currentSubcategories = new Set(data.industry.subcategories);
    const currentCategories = new Set(data.industry.categories);

    if (checked) {
      currentSubcategories.add(subcategory);
      // Check if all subcategories are selected
      const allSelected = industries[category as keyof typeof industries]
        .every(sub => currentSubcategories.has(sub));
      if (allSelected) {
        currentCategories.add(category);
      }
    } else {
      currentSubcategories.delete(subcategory);
      // Optionally remove the main category if no subcategories are selected
      if (!industries[category as keyof typeof industries].some(sub => currentSubcategories.has(sub))) {
        currentCategories.delete(category);
      }
    }

    onUpdate({
      industry: {
        categories: Array.from(currentCategories),
        subcategories: Array.from(currentSubcategories)
      }
    });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <Label className="text-base">Industry Categories</Label>
            <p className="text-sm text-[#3B6064] mt-1">
              Select the industries you're interested in
            </p>
          </div>
          <InfoTooltip content="Select the Industries and Franchise Preference." />

        </div>

        <div className="space-y-6">
          {Object.entries(industries).map(([category, subcategories]) => (
            <div key={category} className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={data.industry.categories.includes(category)}
                  onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                />
                <Label htmlFor={category} className="font-medium">
                  {category}
                </Label>
              </div>

              {data.industry.categories.includes(category) && (
                <div className="ml-6 grid grid-cols-2 gap-4">
                  {subcategories.map((subcategory) => (
                    <div key={subcategory} className="flex items-center space-x-2">
                      <Checkbox
                        id={subcategory}
                        checked={data.industry.subcategories.includes(subcategory)}
                        onCheckedChange={(checked) =>
                          handleSubcategoryChange(category, subcategory, checked as boolean)
                        }
                      />
                      <Label htmlFor={subcategory} className="text-sm">
                        {subcategory}
                      </Label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <Label className="text-base">Franchise Preference</Label>
            <p className="text-sm text-[#3B6064] mt-1">
              Select your franchise preferences
            </p>
          </div>

        </div>

        <RadioGroup
          value={data.franchise}
          onValueChange={(value) => onUpdate({ franchise: value as SearchCriteria['franchise'] })}
          className="grid grid-cols-3 max-md:grid-cols-2 gap-4"
        >
          {[
            { value: 'existing', label: 'Existing Franchise' },
            { value: 'new', label: 'New Franchise' },
            { value: 'non-franchise', label: 'Non-Franchise' }
          ].map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={`franchise-${option.value}`} />
              <Label htmlFor={`franchise-${option.value}`}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}