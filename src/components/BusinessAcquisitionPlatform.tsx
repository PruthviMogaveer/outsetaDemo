import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { ViewControls } from '@/components/dashboard/ViewControls';
import { LeadsList } from '@/components/leads/LeadsList';
import { DashboardTour } from '@/components/tour/DashboardTour';
import { mockData } from '@/lib/mock-data';
import { OutsetaAuth } from './auth/OutsetaAuth';

export interface FilterOptions {
  location?: string;
  revenueRange?: [number, number];
  industries?: string[];
  minScore?: number;
}

type SortOptions = {
  field: 'revenue' | 'earnings' | 'score' | 'title';
  direction: 'asc' | 'desc';
};

interface BusinessAcquisitionPlatformProps {
  showTour?: boolean;
}

const BusinessAcquisitionPlatform: React.FC<BusinessAcquisitionPlatformProps> = ({ 
  showTour = false
}) => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('toReview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedCardId, setExpandedCardId] = useState<number | null>(null);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    location: '',
    revenueRange: [0, 10000000],
    industries: [],
    minScore: 0
  });
  const [sortOptions, setSortOptions] = useState<SortOptions>({
    field: 'score',
    direction: 'desc',
  });

  const filteredAndSortedLeads = useMemo(() => {
    let leads = mockData.leads;
    
    leads = leads.filter(lead => {
        if (viewMode === 'toReview') {
            return lead.status === 'To Review' || lead.status === 'One Click Failed';
        } else {
            return !['To Review', 'One Click Failed'].includes(lead.status);
        }
    });

    if (viewMode === 'activeLeads') {
        leads = leads.filter(lead => {
            const revenue = parseFloat(lead.financials.revenue.replace(/[^0-9.-]+/g, ''));
            return (
                (!filterOptions.industries?.length || 
                    filterOptions.industries.includes(lead.industry)) &&
                (!filterOptions.revenueRange || 
                    (revenue >= filterOptions.revenueRange[0] && 
                     revenue <= filterOptions.revenueRange[1])) &&
                (!filterOptions.location || 
                    lead.location.toLowerCase().includes(filterOptions.location.toLowerCase())) &&
                (filterOptions.minScore === undefined || 
                    lead.score >= filterOptions.minScore)
            );
        });
    }

    const sortModifier = sortOptions.direction === 'asc' ? 1 : -1;
    return leads.sort((a, b) => {
        if (sortOptions.field === 'revenue') {
            return (parseFloat(a.financials.revenue.replace(/[^0-9.-]+/g, '')) -
                    parseFloat(b.financials.revenue.replace(/[^0-9.-]+/g, ''))) * sortModifier;
        }
        if (sortOptions.field === 'earnings') {
            return (parseFloat(a.financials.earnings.replace(/[^0-9.-]+/g, '')) -
                    parseFloat(b.financials.earnings.replace(/[^0-9.-]+/g, ''))) * sortModifier;
        }
        if (sortOptions.field === 'score') {
            return (a.score - b.score) * sortModifier;
        }
        return a.title.localeCompare(b.title) * sortModifier;
    });
  }, [mockData.leads, viewMode, filterOptions, sortOptions]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  return (
    <div className={`min-h-screen  ${isMobileMenuOpen ? 'overflow-hidden' : ''}`}>
      {showTour && <DashboardTour />}
      
      <Navbar 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        onProfileClick={() => navigate('/profile')}
      />
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <main className="max-w-7xl mx-auto px-4 py-6 pt-20">
        <div id="dashboard-stats">
          <DashboardStats stats={mockData.stats} />
        </div>
        <OutsetaAuth />
        
        <div id="view-controls">
          <ViewControls 
            viewMode={viewMode}
            setViewMode={setViewMode}
            filterOptions={filterOptions}
            setFilterOptions={(options: FilterOptions) => setFilterOptions(options)}
            sortOptions={sortOptions}
            setSortOptions={(options: SortOptions) => setSortOptions(options)}
            showFilters={viewMode === 'activeLeads'}
          />
        </div>
        
        <div id="leads-list">
          <LeadsList 
            leads={filteredAndSortedLeads}
            viewMode={viewMode}
            expandedCardId={expandedCardId}
            setExpandedCardId={setExpandedCardId}
          />
        </div>
      </main>
    </div>
  );
};

export default BusinessAcquisitionPlatform;