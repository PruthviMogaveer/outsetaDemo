import { RangeInput } from './RangeInput';

interface MarginRangeProps {
  marginMin: number;
  marginIdeal: number;
  onChange: (field: string, value: number) => void;
}

export function MarginRange({
  marginMin,
  marginIdeal,
  onChange
}: MarginRangeProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <RangeInput
        label="Minimum Margin"
        sublabel="Absolute lowest acceptable"
        value={marginMin}
        onChange={(value) => onChange('marginMin', value)}
        min={0}
        max={100}
      />
      <RangeInput
        label="Ideal Margin"
        sublabel="Target margin percentage"
        value={marginIdeal}
        onChange={(value) => onChange('marginIdeal', value)}
        min={marginMin}
        max={100}
      />
    </div>
  );
}