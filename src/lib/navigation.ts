export const navigationItems = [
  { label: 'Dashboard', path: 'dashboard', 'id':'dashboard' },
  { label: 'All Leads', path: 'all-leads', 'id':'all-leads'  },
  { label: 'Support', path: 'support', 'id':'support' },
  { label: 'Settings', path: 'settings' , 'id':'settings'}
];

export type AppScreen = 'auth' | 'dashboard' | 'profile' | 'all-leads' | 'support' | 'settings'; 