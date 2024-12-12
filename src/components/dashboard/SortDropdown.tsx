import { ChevronDown, ListFilter } from 'lucide-react';
import * as Popover from '@radix-ui/react-popover';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface SortDropdownProps {
  sortOptions: SortOptions;
  setSortOptions: (options: SortOptions) => void;
}

interface SortOptions {
  field: 'score' | 'revenue' | 'earnings' | 'title';
  direction: 'asc' | 'desc';
}

export function SortDropdown({ sortOptions, setSortOptions }: SortDropdownProps) {
  const sortFields = ['score', 'revenue', 'earnings', 'title'];
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild>
        <button className="flex-1 sm:flex-none flex items-center justify-center px-4 py-2 bg-white/80 text-[#03012C] rounded-lg hover:bg-white">
          <ListFilter className="h-5 w-5 mr-2 text-[#3B6064]" />
          Sort
        </button>
      </Popover.Trigger>

      <AnimatePresence>
        {isOpen && (
          <Popover.Portal forceMount>
            <Popover.Content
              className="bg-white rounded-lg shadow-lg p-2 w-48 z-50 border border-[#3B6064]/20"
              sideOffset={5}
              align="end"
              asChild
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
              >
                <div className="space-y-1">
                  {sortFields.map((field) => (
                    <motion.button
                      key={field}
                      className={`w-full text-left px-3 py-2 rounded-md hover:bg-[#F9F4F0] ${
                        sortOptions.field === field ? 'bg-[#F9F4F0] text-[#26A96C]' : 'text-[#03012C]'
                      }`}
                      onClick={() => {
                        setSortOptions({
                          field: field as SortOptions['field'],
                          direction: sortOptions.field === field && sortOptions.direction === 'asc' ? 'desc' : 'asc'
                        });
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="capitalize">{field}</span>
                        {sortOptions.field === field && (
                          <motion.div
                            initial={{ rotate: sortOptions.direction === 'asc' ? 180 : 0 }}
                            animate={{ rotate: sortOptions.direction === 'asc' ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="h-4 w-4 text-[#26A96C]" />
                          </motion.div>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
                <Popover.Arrow className="fill-white" />
              </motion.div>
            </Popover.Content>
          </Popover.Portal>
        )}
      </AnimatePresence>
    </Popover.Root>
  );
} 