import { useState } from 'react';
import { Lead } from './LeadCard';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LeadDetailsProps {
  lead: Lead;
}

export function LeadDetails({ lead }: LeadDetailsProps) {
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  // Dummy tags data
  const searchTags = [
    { label: 'YIB', value: '15 years', score: 8 },
    { label: 'Employees', value: '25-50', score: 6 },
    { label: 'Earnings Margin', value: '35%', score: 10 },
    { label: 'Growth Rate', value: '12%', score: 3 },
    { label: 'Franchise', value: 'No', score: 5 },
    { label: 'Market Share', value: '15%', score: 10 },
    { label: 'Customer Base', value: 'B2B', score: 7 },
    { label: 'Location Type', value: 'Urban', score: 8 }
  ];

  const getScoreColor = (score: number) => {
    if (score === 10) return 'bg-[#26A96C]/10 text-[#26A96C]';
    if (score < 4) return 'bg-red-100 text-red-800';
    return 'bg-[#F9F4F0] text-[#03012C]';
  };


  return (
    <div className="mt-4 pt-4 border-t border-[#3B6064]/20">
      <div className="space-y-4">
        {/* Info Tags Section */}
        <div>
          <h4 className="font-medium mb-2 text-[#03012C]">Business Criteria</h4>
          <div className="flex flex-wrap gap-2">
            {searchTags.map((tag, index) => (
              <div
                key={index}
                className={`px-2 py-1 rounded-full text-sm ${getScoreColor(tag.score)}`}
              >
                {tag.label}: {tag.value}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2 text-[#03012C]">Summary</h4>
          <p className="text-[#3B6064]">{lead.summary}</p>
        </div>

        <div>
          <h4 className="font-medium mb-2 text-[#03012C]">Key Points</h4>
          <ul className="list-disc list-inside text-[#3B6064] space-y-1">
            {lead.keyPoints.map((point, index) => (
              <li key={index} className="text-sm sm:text-base">
                <span className="break-words">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-2 space-y-4 sm:space-y-0">
          <div className="text-sm text-[#3B6064]">
            {lead.broker.name}, {lead.broker.company} ({lead.broker.daysListed} days)
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 w-full sm:w-auto">
            <button 
              className="w-full sm:w-auto text-[#26A96C] hover:text-[#26A96C]/80"
              onClick={(e) => e.stopPropagation()}
            >
              Contact Broker
            </button>
            <div className="hidden sm:block w-px h-4 bg-[#3B6064]/20 self-center mx-4" />
            <button 
              className="w-full sm:w-auto text-[#26A96C] hover:text-[#26A96C]/80"
              onClick={(e) => e.stopPropagation()}
            >
              View Listing
            </button>
            <div className="hidden sm:block w-px h-4 bg-[#3B6064]/20 self-center mx-4" />
            <button 
              className="w-full sm:w-auto text-[#26A96C] hover:text-[#26A96C]/80"
              onClick={(e) => {
                e.stopPropagation();
                setIsStatusModalOpen(true);
              }}
            >
              Update Status
            </button>
          </div>
        </div>

        {/* Status Update Modal */}
        <Dialog.Root open={isStatusModalOpen} onOpenChange={setIsStatusModalOpen}>
          <Dialog.Portal>
            <div className="fixed inset-0 flex items-center justify-center z-[9999]">
              <AnimatePresence>
                {isStatusModalOpen && (
                  <>
                    {/* Overlay */}
                    <Dialog.Overlay asChild>
                      <motion.div
                        className="fixed inset-0 bg-black/50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    </Dialog.Overlay>

                    {/* Modal Content */}
                    <Dialog.Content asChild>
                      <motion.div
                        className="fixed top-[30%]  transform -translate-x-[50%] -translate-y-[50%]
                                   max-sm:w-[350px] w-[400px] bg-white rounded-lg shadow-lg"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        style={{ margin: 0 }}
                      >
                        <div className="p-6">
                          <div className="flex justify-between items-center mb-4">
                            <Dialog.Title className="text-lg font-semibold text-[#03012C]">
                              Update Status
                            </Dialog.Title>
                            <Dialog.Close asChild>
                              <button className="text-[#3B6064] hover:text-[#03012C] p-1">
                                <X className="h-5 w-5" />
                              </button>
                            </Dialog.Close>
                          </div>

                          <div className="space-y-4">
                            {/* Status Input */}
                            <div className="space-y-2">
                              <label htmlFor="status" className="block text-sm font-medium text-[#3B6064]">
                                Enter New Status
                              </label>
                              <input
                                id="status"
                                type="text"
                                className="w-full px-3 py-2 text-base rounded-lg border border-[#3B6064]/20 
                                         focus:outline-none focus:ring-1 focus:ring-[#26A96C]/20 
                                         focus:border-[#26A96C]"
                                placeholder="Enter status..."
                              />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-2">
                              <button
                                className="flex-1 px-4 py-2 bg-[#26A96C] text-white text-sm font-medium
                                          rounded-lg hover:bg-[#26A96C]/90 transition-colors"
                                onClick={() => setIsStatusModalOpen(false)}
                              >
                                Confirm
                              </button>
                              <button
                                className="flex-1 px-4 py-2 bg-[#F9F4F0] text-[#03012C] text-sm font-medium
                                          rounded-lg hover:bg-[#F9F4F0]/80 transition-colors"
                                onClick={() => setIsStatusModalOpen(false)}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </Dialog.Content>
                  </>
                )}
              </AnimatePresence>
            </div>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
  );
}