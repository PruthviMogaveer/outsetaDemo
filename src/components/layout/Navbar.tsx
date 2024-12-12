import { Bell, Menu, CircleUserRound } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { DesktopNav } from './DesktopNav';
import logo from '@/assets/logo.png';

interface NavbarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  onProfileClick: () => void;
}

export function Navbar({ isMobileMenuOpen, setIsMobileMenuOpen, onProfileClick }: NavbarProps) {
  const location = useLocation();
  
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-[#3B6064]/20 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              className="sm:hidden p-2 -ml-2 text-[#3B6064]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <Link to="/dashboard">
              <img
                src={logo}
                alt="Logo"
                className="w-28 max-md:w-20 ml-2 sm:ml-0"
              />
            </Link>
          </div>
          <div className="flex items-center space-x-10">
            <DesktopNav currentPath={location.pathname} />
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="p-2 text-[#3B6064] hover:text-[#26A96C] hover:bg-color/5 transition-all"
              >
                <Bell className="h-5 w-5" />
              </Button>
              <Button
                id='profile-button'
                variant="ghost"
                size="icon"
                onClick={onProfileClick}
                className="p-1.5 text-[#3B6064] hover:text-[#26A96C] hover:bg-color/5 transition-all"
              >
                <CircleUserRound className="h-6 w-6 stroke-[1.5]" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}