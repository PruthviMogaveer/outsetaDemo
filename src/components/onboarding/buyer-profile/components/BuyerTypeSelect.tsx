import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface BuyerTypeSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function BuyerTypeSelect({ value, onChange }: BuyerTypeSelectProps) {
  return (
    <div className="space-y-4">
      <Label>Buyer Type *</Label>
      <RadioGroup
        value={value}
        onValueChange={onChange}
        className="grid sm:grid-cols-3 gap-4"
      >
        {[
          { value: 'individual', label: 'Individual' },
          { value: 'privateEquity', label: 'Private Equity' },
          { value: 'corporation', label: 'Corporation' }
        ].map((type) => (
          <div key={type.value} className="flex items-center space-x-2">
            <RadioGroupItem value={type.value} id={`type-${type.value}`} />
            <Label htmlFor={`type-${type.value}`}>{type.label}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}