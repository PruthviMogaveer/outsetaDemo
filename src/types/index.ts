export interface Stats {
  totalLeadsReviewed: number;
  uniqueBrokers: number;
  matchedLeads: number;
  toReview: number;
  activeLeads: number;
}

export interface Financials {
  revenue: string;
  earnings: string;
  margin: string;
  askingPrice: string;
}

export interface Broker {
  name: string;
  company: string;
  daysListed: number;
}

export interface Details {
  yearsInBusiness: number;
  employees: number;
  franchise: string;
  tags: string[];
}

export interface Lead {
  id: number;
  title: string;
  status: string;
  location: string;
  industry: string;
  financials: Financials;
  score: number;
  summary: string;
  keyPoints: string[];
  broker: Broker;
  details: Details;
}