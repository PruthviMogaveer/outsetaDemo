import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { LeadsList } from '@/components/leads/LeadsList';
import { FilterDrawer } from '@/components/dashboard/FilterDrawer';
import { SortDropdown } from '@/components/dashboard/SortDropdown';
import { Filter } from 'lucide-react';
import { mockData } from '@/lib/mock-data';
import { Lead, LeadCard } from '@/components/leads/LeadCard';
import { Navbar } from '@/components/layout/Navbar';
import { MobileMenu } from '@/components/layout/MobileMenu';

interface SortOptions {
  field: 'score' | 'revenue' | 'earnings' | 'title';
  direction: 'asc' | 'desc';
}

interface FilterOptions {
  location?: string;
  revenueRange?: [number, number];
  industries?: string[];
  minScore?: number;
  dateRange?: [Date, Date];
  status?: string[];
}

export const AllLeads = () => {
  const navigate = useNavigate();
  const [expandedCardId, setExpandedCardId] = useState<number | null>(null);
  const [sortOptions, setSortOptions] = useState<SortOptions>({
    field: 'score',
    direction: 'desc',
  });
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    location: '',
    revenueRange: [0, 10000000],
    industries: [],
    minScore: 0,
    dateRange: [new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), new Date()],
    status: [],
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const filteredAndSortedLeads = useMemo(() => {
    let leads = [...mockData.leads];

    // Apply filters
    if (filterOptions.location) {
      leads = leads.filter(lead =>
        lead.location.toLowerCase().includes(filterOptions.location?.toLowerCase() || '')
      );
    }

    if (filterOptions.industries?.length) {
      leads = leads.filter(lead =>
        filterOptions.industries?.includes(lead.industry)
      );
    }

    if (filterOptions.minScore) {
      leads = leads.filter(lead =>
        lead.score >= (filterOptions.minScore || 0)
      );
    }

    // Apply sorting
    return leads.sort((a: Lead, b: Lead) => {
      const field = sortOptions.field;

      // Get correct values based on field
      let aValue, bValue;
      switch (field) {
        case 'revenue':
          aValue = parseFloat(a.financials.revenue.replace(/[^0-9.-]+/g, ''));
          bValue = parseFloat(b.financials.revenue.replace(/[^0-9.-]+/g, ''));
          break;
        case 'earnings':
          aValue = parseFloat(a.financials.earnings.replace(/[^0-9.-]+/g, ''));
          bValue = parseFloat(b.financials.earnings.replace(/[^0-9.-]+/g, ''));
          break;
        default:
          aValue = a[field];
          bValue = b[field];
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOptions.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortOptions.direction === 'asc'
        ? Number(aValue) - Number(bValue)
        : Number(bValue) - Number(aValue);
    });
  }, [sortOptions, filterOptions]);

  return (
    <div className={`min-h-screen  ${isMobileMenuOpen ? 'overflow-hidden' : ''}`}>
      <Navbar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        onProfileClick={() => navigate('/profile')}
      />
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <div className="max-w-7xl mx-auto px-4 py-6 pt-20">
        <div className="">
          <h1 className="text-2xl font-semibold text-[#03012C]">All Leads</h1>
          <p className="text-[#3B6064] mt-1">
            View and manage all your leads in one place
          </p>
        </div>

        <div className="top-16 z-10 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="flex gap-2 w-full sm:w-auto sm:ml-auto">
              <SortDropdown
                sortOptions={sortOptions}
                setSortOptions={setSortOptions}
              />
              <button
                className="flex-1 sm:flex-none flex items-center justify-center px-4 py-2 bg-white/80 rounded-lg hover:bg-white text-[#03012C]"
                onClick={() => setIsFilterOpen(true)}
              >
                <Filter className="h-5 w-5 mr-2 text-[#3B6064]" />
                Filter
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4 mt-4">
          {filteredAndSortedLeads.map((lead) => (
            <LeadCard
              key={lead.id}
              lead={lead}
              viewMode={lead.status === 'To Review' || lead.status === 'One Click Failed' ? 'toReview' : 'activeLeads'}
              isExpanded={expandedCardId === lead.id}
              onToggleExpand={() => setExpandedCardId(expandedCardId === lead.id ? null : lead.id)}
            />
          ))}
        </div>

        <FilterDrawer
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
        />
      </div>
    </div>
  );
}