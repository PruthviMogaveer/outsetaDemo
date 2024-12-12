import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatCurrency } from '@/lib/utils/validation';
import { AlertCircle, DollarSign } from 'lucide-react';

interface InvestmentInputProps {
  value: number;
  onChange: (value: number) => void;
}

export function InvestmentInput({ value, onChange }: InvestmentInputProps) {
  const handleChange = (inputValue: string) => {
    // Remove any non-numeric characters
    const numericValue = inputValue.replace(/[^0-9]/g, '');
    onChange(Number(numericValue));
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="investment">Amount to Invest *</Label>
      <div className="relative">
        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          id="investment"
          type="text"
          value={value ? formatCurrency(value).replace('$', '') : ''}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Enter investment amount"
          className={`pl-9 ${value === 0 ? 'border-red-300 focus:border-red-300' : ''}`}
        />
      </div>
      {value === 0 && (
        <p className="text-red-500 text-sm flex items-center mt-1">
          <AlertCircle className="h-4 w-4 mr-1" />
          Investment amount is required
        </p>
      )}
    </div>
  );
}