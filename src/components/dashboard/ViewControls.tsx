import { Filter } from 'lucide-react';
import { useState } from 'react';
import { FilterDrawer } from './FilterDrawer';
import { SortDropdown } from './SortDropdown';
import * as Tabs from '@radix-ui/react-tabs';
import { FilterOptions } from '@/components/BusinessAcquisitionPlatform';

interface ViewControlsProps {
  viewMode: string;
  setViewMode: (mode: string) => void;
  filterOptions: FilterOptions;
  setFilterOptions: (options: FilterOptions) => void;
  sortOptions: SortOptions;
  setSortOptions: (options: SortOptions) => void;
  showFilters: boolean;
}

export interface SortOptions {
  field: 'score' | 'revenue' | 'earnings' | 'title';
  direction: 'asc' | 'desc';
}

export function ViewControls({
  viewMode,
  setViewMode,
  filterOptions,
  setFilterOptions,
  sortOptions,
  setSortOptions,
  showFilters
}: ViewControlsProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="sticky top-16  z-10 pb-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <Tabs.Root value={viewMode} onValueChange={setViewMode} className="w-full">
          <Tabs.List className="flex space-x-2 w-full sm:w-auto">
            <Tabs.Trigger
              value="toReview"
              className={`flex-1 sm:flex-none px-4 py-2 rounded-lg ${
                viewMode === 'toReview' 
                  ? 'bg-[#26A96C] text-white' 
                  : 'bg-white/80 text-[#03012C] hover:bg-white'
              }`}
            >
              To Review
            </Tabs.Trigger>
            <Tabs.Trigger
              value="activeLeads"
              className={`flex-1 sm:flex-none px-4 py-2 rounded-lg ${
                viewMode === 'activeLeads' 
                  ? 'bg-[#26A96C] text-white' 
                  : 'bg-white/80 text-[#03012C] hover:bg-white'
              }`}
            >
              Active Leads
            </Tabs.Trigger>
          </Tabs.List>
        </Tabs.Root>

        <div className="flex gap-2 w-full sm:w-auto">
          <SortDropdown
            sortOptions={sortOptions}
            setSortOptions={setSortOptions}
          />
          {viewMode === 'activeLeads' && showFilters && (
            <ControlButton
              icon={<Filter className="h-5 w-5 mr-2 text-[#3B6064]" />}
              label="Filter"
              onClick={() => setIsFilterOpen(true)}
            />
          )}
        </div>
      </div>

      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
      />
    </div>
  );
}

function ControlButton({
  icon,
  label,
  onClick
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      className="flex-1 sm:flex-none flex items-center justify-center px-4 py-2 bg-white/80 text-[#03012C] rounded-lg hover:bg-white"
      onClick={onClick}
    >
      {icon}
      {label}
    </button>
  );
}