import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface LocationSelectProps {
  label: string;
  placeholder: string;
  options: string[];
  selectedValues: string[];
  onSelect: (value: string) => void;
  onRemove: (value: string) => void;
  badgeClassName?: string;
}

export function LocationSelect({
  label,
  placeholder,
  options,
  selectedValues,
  onSelect,
  onRemove,
  badgeClassName = "bg-[#F9F4F0] text-[#03012C] hover:bg-[#F9F4F0]/80"
}: LocationSelectProps) {
  return (
    <div className="space-y-4">
      <Select onValueChange={onSelect}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options
            .filter(option => !selectedValues.includes(option))
            .map(option => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      <div className="flex flex-wrap gap-2">
        {selectedValues.map(value => (
          <Badge
            key={value}
            variant="secondary"
            className={badgeClassName}
          >
            {value}
            <button
              onClick={() => onRemove(value)}
              className="ml-2 hover:text-[#26A96C]"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
}