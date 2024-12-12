import * as Dialog from '@radix-ui/react-dialog';
import { FilterOptions } from '@/components/BusinessAcquisitionPlatform';
import { motion, AnimatePresence } from 'framer-motion';
import { forwardRef } from 'react';

interface FilterDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    filterOptions: FilterOptions;
    setFilterOptions: (options: FilterOptions) => void;
}

const FilterDrawer = forwardRef<HTMLDivElement, FilterDrawerProps>(({ 
    isOpen, 
    onClose, 
    filterOptions, 
    setFilterOptions 
}, ref) => {
    const industries = [
        'Technology',
        'Healthcare',
        'Retail',
        'Manufacturing',
        'Finance',
        'Real Estate',
        'Education',
        'Entertainment',
        'Food & Beverage',
        'Transportation'
    ];

    return (
        <Dialog.Root open={isOpen} onOpenChange={onClose}>
            <Dialog.Portal forceMount>
                <AnimatePresence mode="wait">
                    {isOpen && (
                        <>
                            <Dialog.Overlay asChild>
                                <motion.div
                                    className="fixed inset-0 bg-[#03012C]/50 z-50"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                />
                            </Dialog.Overlay>
                            <Dialog.Content ref={ref} asChild>
                                <motion.div
                                    className="fixed right-0 top-0 h-full w-[100%] sm:w-[80%] md:w-96 bg-white p-4 sm:p-6 shadow-lg z-50 overflow-y-auto"
                                    initial={{ x: '100%', opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: '100%', opacity: 0 }}
                                    transition={{
                                        type: "spring",
                                        damping: 30,
                                        stiffness: 300
                                    }}
                                >
                                    <Dialog.Title className="text-xl font-semibold mb-6 text-[#03012C]">
                                        Filters
                                    </Dialog.Title>

                                    <div className="space-y-6">
                                        {/* Location Filter */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-[#3B6064]">
                                                Location
                                            </label>
                                            <input
                                                type="text"
                                                value={filterOptions.location || ''}
                                                onChange={(e) => setFilterOptions({
                                                    ...filterOptions,
                                                    location: e.target.value.toLowerCase()
                                                })}
                                                className="w-full p-2 border border-[#3B6064]/20 rounded-md bg-white focus:ring-1 focus:ring-[#26A96C] focus:border-[#26A96C] outline-none"
                                                placeholder="Enter city, state, or region"
                                            />
                                        </div>

                                        {/* Revenue Range */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-[#3B6064]">
                                                Revenue Range
                                            </label>
                                            <div className="px-2">
                                                <div className="flex justify-between text-sm text-[#3B6064] mb-2">
                                                    <span>$0M</span>
                                                    <span>${((filterOptions.revenueRange?.[1] || 10000000) / 1000000).toFixed(1)}M</span>
                                                </div>
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="10000000"
                                                    step="100000"
                                                    value={filterOptions.revenueRange?.[1] || 0}
                                                    onChange={(e) => setFilterOptions({
                                                        ...filterOptions,
                                                        revenueRange: [0, Number(e.target.value)]
                                                    })}
                                                    className="w-full accent-[#26A96C] outline-none"
                                                />
                                            </div>
                                        </div>

                                        {/* Industries */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-[#3B6064]">
                                                Industries
                                            </label>
                                            <div className="grid grid-cols-2 gap-4">
                                                {industries.map((industry) => (
                                                    <div key={industry} className="flex items-center space-x-2">
                                                        <input
                                                            type="checkbox"
                                                            id={industry}
                                                            checked={filterOptions.industries?.includes(industry)}
                                                            onChange={(e) => {
                                                                const currentIndustries = filterOptions.industries || [];
                                                                setFilterOptions({
                                                                    ...filterOptions,
                                                                    industries: e.target.checked
                                                                        ? [...currentIndustries, industry]
                                                                        : currentIndustries.filter(i => i !== industry)
                                                                });
                                                            }}
                                                            className="w-4 h-4 text-[#26A96C] bg-white border-2 border-[#3B6064]/30 rounded 
                                                            focus:ring-1 focus:ring-[#26A96C] focus:ring-offset-0 outline-none 
                                                            checked:border-[#26A96C] checked:bg-[#26A96C] cursor-pointer accent-[#26A96C]"
                                                        />
                                                        <label htmlFor={industry} className="text-sm text-[#3B6064] cursor-pointer select-none flex-1">
                                                            {industry}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Minimum Score */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-[#3B6064]">
                                                Minimum Score
                                            </label>
                                            <input
                                                type="number"
                                                min="0"
                                                max="10"
                                                value={filterOptions.minScore ?? 0}
                                                onChange={(e) => setFilterOptions({
                                                    ...filterOptions,
                                                    minScore: Number(e.target.value)
                                                })}
                                                className="w-full p-2 border border-[#3B6064]/20 rounded-md bg-white focus:ring-1 focus:ring-[#26A96C] focus:border-[#26A96C] outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                                placeholder="Enter minimum score (0-10)"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-6 flex justify-end gap-4">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => {
                                                setFilterOptions({
                                                    location: '',
                                                    revenueRange: [0, 10000000],
                                                    industries: [],
                                                    minScore: 0
                                                });
                                            }}
                                            className="px-4 py-2 border border-[#3B6064]/20 bg-white text-[#3B6064] rounded-lg hover:bg-[#26A96C]/10 hover:border-[#26A96C] focus:outline-none focus:ring-1 focus:ring-[#26A96C]"
                                        >
                                            Reset
                                        </motion.button>
                                        <Dialog.Close asChild>
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={onClose}
                                                className="px-4 py-2 bg-[#26A96C] text-white rounded-lg hover:bg-[#26A96C]/90 focus:outline-none focus:ring-1 focus:ring-[#26A96C]"
                                            >
                                                Apply
                                            </motion.button>
                                        </Dialog.Close>
                                    </div>
                                </motion.div>
                            </Dialog.Content>
                        </>
                    )}
                </AnimatePresence>
            </Dialog.Portal>
        </Dialog.Root>
    );
});

FilterDrawer.displayName = 'FilterDrawer';

export { FilterDrawer };