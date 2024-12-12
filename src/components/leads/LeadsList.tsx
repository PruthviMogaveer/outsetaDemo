import { Lead } from './LeadCard';
import { LeadCard } from './LeadCard';

interface LeadsListProps {
  leads: Lead[];
  viewMode: string;
  expandedCardId: number | null;
  setExpandedCardId: (id: number | null) => void;
}

export function LeadsList({ leads, viewMode, expandedCardId, setExpandedCardId }: LeadsListProps) {
  return (
    <div className="space-y-4">
      {leads.map((lead) => (
        <LeadCard
          key={lead.id}
          lead={lead}
          viewMode={viewMode}
          isExpanded={expandedCardId === lead.id}
          onToggleExpand={() => setExpandedCardId(expandedCardId === lead.id ? null : lead.id)}
        />
      ))}
    </div>
  );
}