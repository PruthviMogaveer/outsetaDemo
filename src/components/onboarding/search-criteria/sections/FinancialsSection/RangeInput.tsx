import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface RangeInputProps {
  label: string;
  sublabel?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
  step?: number;
}

export function RangeInput({
  label,
  sublabel,
  value,
  onChange,
  min = 0,
  max,
  className,
  step
}: RangeInputProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <Label className="text-sm text-[#3B6064]">
        {label}
        {sublabel && <span className="block text-xs opacity-70">{sublabel}</span>}
      </Label>
      <Input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-11"
        step={step}
      />
    </div>
  );
}