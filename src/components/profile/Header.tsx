import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
    onBack: () => void;
}

export const Header = ({ onBack }: HeaderProps) => (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-[#3B6064]/20 z-50">
        <div className="max-w-[86rem] mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between h-16">
                <div className="flex items-center space-x-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onBack}
                        className="flex items-center text-[#26A96C] bg-color/10 hover:bg-color/20"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Back to Dashboard</span>
                        <span className="sm:hidden">Back</span>
                    </Button>
                    <div className="h-4 w-px bg-[#3B6064]/20" />
                    <h1 className="text-lg font-semibold text-[#03012C]">Profile Settings</h1>
                </div>
            </div>
        </div>
    </header>
);