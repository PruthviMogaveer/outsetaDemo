import { Financials } from './LeadCard';

interface LeadFinancialsProps {
  financials: Financials;
}

export function LeadFinancials({ financials }: LeadFinancialsProps) {
  const items = [
    { label: 'Revenue', value: financials.revenue },
    { label: 'Earnings', value: financials.earnings },
    { label: 'Margin', value: financials.margin },
    { label: 'Asking Price', value: financials.askingPrice },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
      {items.map((item) => (
        <div key={item.label}>
          <div className="text-sm text-[#3B6064]">{item.label}</div>
          <div className="font-semibold text-[#03012C]">{item.value}</div>
        </div>
      ))}
    </div>
  );
}