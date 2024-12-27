import { useEffect } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

export function DashboardTour() {
  useEffect(() => {
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: '#dashboard-stats',
          popover: {
            title: 'Dashboard Overview',
            description: 'Here you can see your key metrics and statistics at a glance.',
            side: 'bottom',
            align: 'start'
          }
        },
        {
          element: '#view-controls',
          popover: {
            title: 'View Controls',
            description: 'Switch between leads to review and active leads, plus sort and filter options.',
            side: 'bottom'
          }
        },
        {
          element: '#leads-list',
          popover: {
            title: 'Leads List',
            description: 'Browse and manage all your business leads here. Click on any lead to see more details.',
            side: 'top'
          }
        },
        {
          element: '#profile-button',
          popover: {
            title: 'Profile Settings',
            description: 'Access your profile settings, buyer preferences, and search criteria.',
            side: 'left'
          }
        },
        {
          element: '#all-leads',
          popover: {
            title: 'All leads',
            description: 'Here you can access all the leads.',
            side: 'left'
          }
        }
      ],
      nextBtnText: 'Next',
      prevBtnText: 'Previous',
      doneBtnText: 'Done',
    });

    driverObj.drive();

    return () => {
      driverObj.destroy();
    };
  }, []);

  return null;
}