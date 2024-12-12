import { useState } from 'react';
import { SearchCriteria } from '@/types/onboarding';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface LocationSectionProps {
  data: SearchCriteria;
  onUpdate: (data: Partial<SearchCriteria>) => void;
  maxStates: number;
}

const states = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
  'Wisconsin', 'Wyoming'
];

// This would typically come from an API based on selected states
const getMetroAreas = (selectedStates: string[]) => {
  const metroAreas: Record<string, string[]> = {
    'Georgia': ['Atlanta', 'Savannah', 'Augusta', 'Macon'],
    'Florida': ['Miami', 'Orlando', 'Tampa', 'Jacksonville'],
    'Texas': ['Houston', 'Dallas', 'Austin', 'San Antonio'],
    // Add more as needed
  };

  return selectedStates.flatMap(state => metroAreas[state] || []);
};

export function LocationSection({ data, onUpdate, maxStates }: LocationSectionProps) {
  const [availableMetros, setAvailableMetros] = useState<string[]>([]);

  const handleStateSelect = (state: string) => {
    if (data.location.states.length >= maxStates) {
      return;
    }
    
    const newStates = [...data.location.states, state];
    onUpdate({
      location: {
        ...data.location,
        states: newStates
      }
    });
    setAvailableMetros(getMetroAreas(newStates));
  };

  const handleStateRemove = (state: string) => {
    const newStates = data.location.states.filter(s => s !== state);
    onUpdate({
      location: {
        ...data.location,
        states: newStates,
        priorityMetros: data.location.priorityMetros.filter(
          metro => getMetroAreas([state]).indexOf(metro) === -1
        ),
        excludedMetros: data.location.excludedMetros.filter(
          metro => getMetroAreas([state]).indexOf(metro) === -1
        )
      }
    });
    setAvailableMetros(getMetroAreas(newStates));
  };

  const handleMetroSelect = (metro: string, type: 'priority' | 'excluded') => {
    const otherType = type === 'priority' ? 'excludedMetros' : 'priorityMetros';
    const currentType = `${type}Metros` as keyof SearchCriteria['location'];
    
    onUpdate({
      location: {
        ...data.location,
        [currentType]: [...data.location[currentType], metro],
        [otherType]: data.location[otherType].filter(m => m !== metro)
      }
    });
  };

  const handleMetroRemove = (metro: string, type: 'priority' | 'excluded') => {
    const currentType = `${type}Metros` as keyof SearchCriteria['location'];
    
    onUpdate({
      location: {
        ...data.location,
        [currentType]: data.location[currentType].filter(m => m !== metro)
      }
    });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div>
          <Label>Selected States</Label>
          <p className="text-sm text-[#3B6064] mt-1">
            Select up to {maxStates} states for your search area
          </p>
        </div>

        {data.location.states.length === maxStates && (
          <Alert variant="warning" className="bg-amber-50 border-amber-200">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-600">
              You've reached the maximum number of states ({maxStates}) allowed in your plan.
            </AlertDescription>
          </Alert>
        )}

        <Select
          onValueChange={handleStateSelect}
          disabled={data.location.states.length >= maxStates}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a state" />
          </SelectTrigger>
          <SelectContent>
            {states
              .filter(state => !data.location.states.includes(state))
              .map(state => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        <div className="flex flex-wrap gap-2">
          {data.location.states.map(state => (
            <Badge
              key={state}
              variant="secondary"
              className="bg-[#F9F4F0] text-[#03012C] hover:bg-[#F9F4F0]/80"
            >
              {state}
              <button
                onClick={() => handleStateRemove(state)}
                className="ml-2 hover:text-[#26A96C]"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      {availableMetros.length > 0 && (
        <>
          <div className="space-y-4">
            <div>
              <Label>Priority Metro Areas</Label>
              <p className="text-sm text-[#3B6064] mt-1">
                Select metro areas you want to prioritize in your search
              </p>
            </div>

            <Select
              onValueChange={(metro) => handleMetroSelect(metro, 'priority')}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a metro area" />
              </SelectTrigger>
              <SelectContent>
                {availableMetros
                  .filter(metro => 
                    !data.location.priorityMetros.includes(metro) &&
                    !data.location.excludedMetros.includes(metro)
                  )
                  .map(metro => (
                    <SelectItem key={metro} value={metro}>
                      {metro}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            <div className="flex flex-wrap gap-2">
              {data.location.priorityMetros.map(metro => (
                <Badge
                  key={metro}
                  variant="secondary"
                  className="bg-[#26A96C]/10 text-[#26A96C] hover:bg-[#26A96C]/20"
                >
                  {metro}
                  <button
                    onClick={() => handleMetroRemove(metro, 'priority')}
                    className="ml-2"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Excluded Metro Areas</Label>
              <p className="text-sm text-[#3B6064] mt-1">
                Select metro areas you want to exclude from your search
              </p>
            </div>

            <Select
              onValueChange={(metro) => handleMetroSelect(metro, 'excluded')}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a metro area" />
              </SelectTrigger>
              <SelectContent>
                {availableMetros
                  .filter(metro => 
                    !data.location.priorityMetros.includes(metro) &&
                    !data.location.excludedMetros.includes(metro)
                  )
                  .map(metro => (
                    <SelectItem key={metro} value={metro}>
                      {metro}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            <div className="flex flex-wrap gap-2">
              {data.location.excludedMetros.map(metro => (
                <Badge
                  key={metro}
                  variant="secondary"
                  className="bg-red-100 text-red-800 hover:bg-red-100/80"
                >
                  {metro}
                  <button
                    onClick={() => handleMetroRemove(metro, 'excluded')}
                    className="ml-2"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}