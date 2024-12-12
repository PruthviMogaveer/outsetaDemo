import { Building2, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { LeadFinancials } from './LeadFinancials';
import { LeadDetails } from './LeadDetails';

// Define interfaces here
export interface Lead {
  id: number;
  title: string;
  status: string;
  score: number;
  location: string;
  industry: string;
  summary: string;
  keyPoints: string[];
  financials: Financials;
  broker: {
    name: string;
    company: string;
    daysListed: number;
  };
}

export interface Financials {
  revenue: string;
  earnings: string;
  margin: string;
  askingPrice: string;
}

interface LeadCardProps {
  lead: Lead;
  viewMode: string;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export function LeadCard({ lead, viewMode, isExpanded, onToggleExpand }: LeadCardProps) {
  return (
    <Card 
      className="hover:shadow-lg transition-shadow cursor-pointer bg-white/80"
      onClick={onToggleExpand}
    >
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start space-y-4 sm:space-y-0 mb-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2 py-1 bg-[#26A96C]/10 text-[#26A96C] text-sm rounded-full">
                {lead.status}
              </span>
              <span className="bg-[#F9F4F0] text-[#03012C] text-sm px-2 py-1 rounded-full">
                Score: {lead.score}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-[#03012C]">{lead.title}</h3>
            <div className="flex items-center text-sm text-[#3B6064] mt-1">
              <Building2 className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="truncate">{lead.location} • {lead.industry}</span>
            </div>
          </div>
          <LeadActions viewMode={viewMode} />
        </div>

        <LeadFinancials financials={lead.financials} />
        
        {isExpanded && <LeadDetails lead={lead} />}
      </CardContent>
    </Card>
  );
}

function LeadActions({ viewMode }: { viewMode: string }) {
  return (
    <div className="flex space-x-2 w-full sm:w-auto">
      {viewMode === 'toReview' ? (
        <>
          <button className="flex-1 sm:flex-none px-4 py-2 bg-[#26A96C] text-white rounded-lg hover:bg-[#26A96C]/90">
            Request
          </button>
          <button className="p-2 text-[#3B6064] hover:text-[#26A96C]">
            <X className="h-5 w-5" />
          </button>
        </>
      ) : (
        <button className="w-full sm:w-auto px-4 py-2 bg-[#F9F4F0] text-[#03012C] rounded-lg hover:bg-[#F9F4F0]/80">
          Update Status
        </button>
      )}
    </div>
  );
}