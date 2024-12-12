import { RangeInput } from './RangeInput';

interface AskingMultipleProps {
  ideal: number;
  max: number;
  onChange: (field: string, value: number) => void;
}

export function AskingMultiple({
  ideal,
  max,
  onChange
}: AskingMultipleProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <RangeInput
        label="Ideal Multiple"
        sublabel="Target asking price multiple"
        value={ideal}
        onChange={(value) => onChange('ideal', value)}
        min={0}
        max={max}
        step={0.1}
      />
      <RangeInput
        label="Maximum Multiple"
        sublabel="Highest acceptable multiple"
        value={max}
        onChange={(value) => onChange('max', value)}
        min={ideal}
        max={20}
        step={0.1}
      />
    </div>
  );
}