import { RangeInput } from './RangeInput';

interface EarningsRangeProps {
  floorMin: number;
  floorIdeal: number;
  ceilingIdeal: number;
  ceilingMax: number;
  onChange: (field: string, value: number) => void;
  maxEarnings: number;
}

export function EarningsRange({
  floorMin,
  floorIdeal,
  ceilingIdeal,
  ceilingMax,
  onChange,
  maxEarnings
}: EarningsRangeProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <label>Floor (Minimum)</label>
        <div className="grid grid-cols-2 gap-4">
          <RangeInput
            label="True Minimum"
            value={floorMin}
            onChange={(value) => onChange('floorMin', value)}
            max={floorIdeal}
          />
          <RangeInput
            label="Ideal Minimum"
            value={floorIdeal}
            onChange={(value) => onChange('floorIdeal', value)}
            min={floorMin}
            max={ceilingIdeal}
          />
        </div>
      </div>

      <div className="space-y-4">
        <label>Ceiling (Maximum)</label>
        <div className="grid grid-cols-2 gap-4">
          <RangeInput
            label="Ideal Maximum"
            value={ceilingIdeal}
            onChange={(value) => onChange('ceilingIdeal', value)}
            min={floorIdeal}
            max={ceilingMax}
          />
          <RangeInput
            label="True Maximum"
            value={ceilingMax}
            onChange={(value) => onChange('ceilingMax', value)}
            min={ceilingIdeal}
            max={maxEarnings}
          />
        </div>
      </div>
    </div>
  );
}