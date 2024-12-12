import { useState } from 'react';
import { SearchCriteria } from '@/types/onboarding';
import { Label } from '@/components/ui/label';
import { LocationSelect } from './LocationSelect';
import { MetroSelect } from './MetroSelect';

interface LocationSectionProps {
  data: SearchCriteria;
  onUpdate: (data: Partial<SearchCriteria>) => void;
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

export function LocationSection({ data, onUpdate }: LocationSectionProps) {
  const [availableMetros, setAvailableMetros] = useState<string[]>([]);

  const handleStateSelect = (state: string) => {
    if (data.location.states.length >= 3) return;
    
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
            Select up to 3 states for your search area
          </p>
        </div>

        <LocationSelect
          label="States"
          placeholder="Select a state"
          options={states}
          selectedValues={data.location.states}
          onSelect={handleStateSelect}
          onRemove={handleStateRemove}
        />
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

            <MetroSelect
              type="priority"
              metros={availableMetros}
              selectedMetros={data.location.priorityMetros}
              onSelect={(metro) => handleMetroSelect(metro, 'priority')}
              onRemove={(metro) => handleMetroRemove(metro, 'priority')}
            />
          </div>

          <div className="space-y-4">
            <div>
              <Label>Excluded Metro Areas</Label>
              <p className="text-sm text-[#3B6064] mt-1">
                Select metro areas you want to exclude from your search
              </p>
            </div>

            <MetroSelect
              type="excluded"
              metros={availableMetros}
              selectedMetros={data.location.excludedMetros}
              onSelect={(metro) => handleMetroSelect(metro, 'excluded')}
              onRemove={(metro) => handleMetroRemove(metro, 'excluded')}
            />
          </div>
        </>
      )}
    </div>
  );
}