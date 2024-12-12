import { LocationSelect } from './LocationSelect';

interface MetroSelectProps {
  type: 'priority' | 'excluded';
  metros: string[];
  selectedMetros: string[];
  onSelect: (metro: string) => void;
  onRemove: (metro: string) => void;
}

export function MetroSelect({
  type,
  metros,
  selectedMetros,
  onSelect,
  onRemove
}: MetroSelectProps) {
  const getBadgeClassName = () => {
    if (type === 'priority') {
      return "bg-[#26A96C]/10 text-[#26A96C] hover:bg-[#26A96C]/20";
    }
    return "bg-red-100 text-red-800 hover:bg-red-100/80";
  };

  return (
    <LocationSelect
      label={type === 'priority' ? 'Priority Metro Areas' : 'Excluded Metro Areas'}
      placeholder={`Select a metro area to ${type === 'priority' ? 'prioritize' : 'exclude'}`}
      options={metros}
      selectedValues={selectedMetros}
      onSelect={onSelect}
      onRemove={onRemove}
      badgeClassName={getBadgeClassName()}
    />
  );
}