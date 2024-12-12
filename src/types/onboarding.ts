import React from "react";
import type { LucideIcon } from 'lucide-react';

export type OnboardingStep = 
  | 'subscription'
  | 'survey'
  | 'searchIntro'
  | 'searchCriteria'
  | 'buyerProfile';

export interface OnboardingProgress {
  currentStep: OnboardingStep;
  completedSteps: OnboardingStep[];
}

export interface SubscriptionPlan {
  name: string;
  monthlyPrice: number;
  maxStates: number;
  maxEarnings: number;
  features: string[];
  popular?: boolean;
  icon: LucideIcon;
}

export interface OnboardingSurvey {
  companyName?: string;
  websiteUrl?: string;
  linkedinUrl?: string;
  buyerType?: 'businessOwner' | 'searchingFullTime' | 'searchingPartTime' | 'searchingHobby' | 'other' | 'individual' | 'privateEquity' | 'corporation';
  experience?: 'expert' | 'advanced' | 'intermediate' | 'basic';
  careerPhase?: 'recentGraduate' | 'earlyCareer' | 'midCareer' | 'seniorProfessional' | 'lateCareer' | 'militaryVeteran' | 'other';
  fundingSources?: string[];
  supportNeeded?: string[];
  expectations?: string;
  experienceLevel?: 'none' | 'upToFive' | 'moreThanFive';
}

export interface SearchCriteria {
  location: {
    states: string[];
    priorityMetros: string[];
    excludedMetros: string[];
  };
  earnings: {
    floorMin: number;
    floorIdeal: number;
    ceilingIdeal: number;
    ceilingMax: number;
    marginIdeal: number;
    marginMin: number;
  };
  askingMultiple: {
    ideal: number;
    max: number;
  };
  industry: {
    categories: string[];
    subcategories: string[];
  };
  businessTags: string[];
  franchise: 'existing' | 'new' | 'non-franchise';
  yearsInBusiness: {
    idealMin: number;
    trueMin: number;
  };
  employees: {
    idealMin: number;
    trueMin: number;
  };
  excludePoorQuality: boolean;
}

export interface BuyerProfile {
  oneClickRequest?: boolean;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
  buyerType?: 'businessOwner' | 'searchingFullTime' | 'searchingPartTime' | 'searchingHobby' | 'other' | 'individual' | 'privateEquity' | 'corporation';
  experienceLevel?: 'none' | 'upToFive' | 'moreThanFive';
  investmentAmount?: number;
}