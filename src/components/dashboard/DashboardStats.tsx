import { Card, CardContent } from '@/components/ui/card';
import { memo } from 'react';

type StatsCardItem = {
  key: 'totalLeadsReviewed' | 'uniqueBrokers' | 'matchedLeads';
  label: string;
};

type StatsSummaryItem = {
  key: 'toReview' | 'activeLeads';
  label: string;
};

interface DashboardStatsProps {
  stats: {
    totalLeadsReviewed: number;
    uniqueBrokers: number;
    matchedLeads: number;
    toReview: number;
    activeLeads: number;
  };
  userName?: string;
}

const StatCard = memo(({ value, label }: { value: number; label: string }) => (
  <div className="bg-[#26A96C]/10 p-4 rounded-lg">
    <div className="text-2xl font-bold text-[#26A96C]">{value.toLocaleString()}</div>
    <div className="text-sm text-[#3B6064]">{label}</div>
  </div>
));

StatCard.displayName = 'StatCard';

const STATS_CARDS: StatsCardItem[] = [
  { key: 'totalLeadsReviewed', label: 'Leads in your states' },
  { key: 'uniqueBrokers', label: 'Different brokers' },
  { key: 'matchedLeads', label: 'Matched leads' }
];

const SUMMARY_STATS: StatsSummaryItem[] = [
  { key: 'toReview', label: 'Leads to review' },
  { key: 'activeLeads', label: 'Active Leads' }
];

export function DashboardStats({ stats, userName = 'Daniel' }: DashboardStatsProps) {
  return (
    <Card className="mb-6 bg-white/80 border-[#3B6064]/20">
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col space-y-4">
          <h2 className="text-lg font-semibold text-[#03012C]">Hi {userName},</h2>
          <p className="text-[#3B6064]">With Archer, we've reviewed:</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            {STATS_CARDS.map((item) => (
              <StatCard 
                key={item.key}
                value={stats[item.key]} 
                label={item.label}
              />
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-between mt-4 space-y-2 sm:space-y-0">
            {SUMMARY_STATS.map((item) => (
              <div key={item.key} className="font-semibold">
                <span>{stats[item.key]}</span> {item.label}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}