import { Link } from 'react-router-dom';
import { navigationItems } from '@/lib/navigation';

interface DesktopNavProps {
  currentPath: string;
}

export function DesktopNav({ currentPath }: DesktopNavProps) {
  return (
    <div className="hidden md:flex items-center space-x-4">
      {navigationItems.map((item) => (
        <Link
          key={item.path}
          to={`/${item.path}`}
          id={item.id}
          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
            ${currentPath === `/${item.path}`
              ? 'text-[#26A96C] bg-color/10'
              : 'text-[#3B6064] hover:text-[#26A96C]'}`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}