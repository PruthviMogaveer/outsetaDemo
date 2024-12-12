import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { Button } from '@/components/ui/button';
import { ChevronDown, HelpCircle, TicketIcon, UserPlus, Lightbulb } from 'lucide-react';

export function Support() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqItems = [
    {
      question: "How do I update my broker profile?",
      answer: "Navigate to Settings > Profile and click on 'Edit Profile' to update your information."
    },
    {
      question: "How can I export my leads?",
      answer: "In the All Leads page, click the 'Export' button in the top right corner to download your leads as a CSV file."
    },
    // Add more FAQ items as needed
  ];

  return (
    <div className={`min-h-screen  ${isMobileMenuOpen ? 'overflow-hidden' : ''}`}>
      <Navbar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        onProfileClick={() => navigate('/profile')}
      />
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <main className="max-w-7xl mx-auto px-4 pt-20 pb-6">
        <h1 className="text-2xl font-semibold text-[#03012C] mb-6">Support Center</h1>

        {/* FAQ Section */}
        <section className="bg-white/80 rounded-lg shadow-sm p-6 mb-6 border border-[#3B6064]/20">
          <h2 className="text-lg font-medium text-[#03012C] mb-4 flex items-center">
            <HelpCircle className="h-5 w-5 mr-2 text-[#26A96C]" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="border border-[#3B6064]/20 rounded-lg">
                <button
                  className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-color/5 transition-colors"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <span className="font-medium text-[#03012C]">{item.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-[#3B6064] transition-transform ${
                      expandedFaq === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedFaq === index && (
                  <div className="px-4 py-3 border-t border-[#3B6064]/20 bg-color/10">
                    <p className="text-[#3B6064]">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Support Actions Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Submit Support Ticket */}
          <div className="bg-white/80 rounded-lg shadow-sm p-6 border border-[#3B6064]/20">
            <div className="flex items-center mb-4">
              <TicketIcon className="h-6 w-6 text-[#26A96C] mr-2" />
              <h2 className="text-lg font-medium text-[#03012C]">Submit Support Ticket</h2>
            </div>
            <p className="text-[#3B6064] mb-4">Need help? Submit a support ticket and we'll get back to you shortly.</p>
            <Button 
              className="w-full bg-[#26A96C] text-white hover:bg-[#26A96C]/90 
                         border border-[#3B6064]/20 transition-colors"
            >
              Create Ticket
            </Button>
          </div>

          {/* Submit New Broker Request */}
          <div className="bg-white/80 rounded-lg shadow-sm p-6 border border-[#3B6064]/20">
            <div className="flex items-center mb-4">
              <UserPlus className="h-6 w-6 text-[#26A96C] mr-2" />
              <h2 className="text-lg font-medium text-[#03012C]">New Broker Request</h2>
            </div>
            <p className="text-[#3B6064] mb-4">Want to add a new broker? Submit a request for approval.</p>
            <Button 
              className="w-full bg-[#26A96C] text-white hover:bg-[#26A96C]/90 
                         border border-[#3B6064]/20 transition-colors"
            >
              Submit Request
            </Button>
          </div>

          {/* Feature Request */}
          <div className="bg-white/80 rounded-lg shadow-sm p-6 border border-[#3B6064]/20">
            <div className="flex items-center mb-4">
              <Lightbulb className="h-6 w-6 text-[#26A96C] mr-2" />
              <h2 className="text-lg font-medium text-[#03012C]">Feature Request</h2>
            </div>
            <p className="text-[#3B6064] mb-4">Have an idea for improvement? We'd love to hear it!</p>
            <Button 
              className="w-full bg-[#26A96C] text-white hover:bg-[#26A96C]/90 
                         border border-[#3B6064]/20 transition-colors"
            >
              Submit Idea
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
} 