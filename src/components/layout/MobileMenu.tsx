import { Link, useLocation } from 'react-router-dom';
import { navigationItems } from '@/lib/navigation';
import { useEffect, useState } from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const location = useLocation();
  const [translateX, setTranslateX] = useState(isOpen ? 0 : -100);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  useEffect(() => {
    if (!isDragging) {
      setTranslateX(isOpen ? 0 : -100);
    }
  }, [isOpen, isDragging]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const currentX = e.touches[0].clientX;
    const diff = ((currentX - startX) / 256) * 100;
    const newTranslate = Math.min(Math.max(-100, diff), 0);

    setTranslateX(newTranslate);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (translateX < -50) {
      onClose();
    } else {
      setTranslateX(0);
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-[#03012C]/20 z-[70] md:hidden transition-opacity duration-300 ease-in-out
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white z-[80] md:hidden 
          transform transition-transform duration-300 ease-in-out
          ${!isDragging ? 'transition-transform duration-300' : 'transition-none'}`}
        style={{ transform: `translateX(${translateX}%)` }}
        role="dialog"
        aria-modal="true"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="h-16 flex items-center px-4 border-b border-[#3B6064]/20">
          <div className="font-semibold text-xl text-[#26A96C]">
            Archer
          </div>
        </div>

        <div className="p-4 space-y-4">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={`/${item.path}`}
              id={item.id}
              className={`block w-full text-left px-4 py-2 rounded-lg transition-all duration-200
                ${location.pathname === `/${item.path}`
                  ? 'text-[#26A96C] bg-color/10'
                  : 'text-[#3B6064] hover:text-[#26A96C] hover:bg-color/5'}`}
              onClick={onClose}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}