import { Building2, Search, User } from 'lucide-react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';

export const Navigation = () => (
    <div className="w-full lg:w-64 shrink-0">
        <div className="bg-white/80 rounded-md border border-[#3B6064]/20 sticky top-24">
            <TabsList className="flex lg:flex-col w-full p-1.5 h-auto bg-transparent">
                <TabsTrigger
                    value="user-details"
                    className="w-full flex items-center gap-3 px-2 lg:px-4 py-2 lg:py-3 
                      text-[13px] lg:text-sm font-medium text-[#3B6064] hover:bg-color/5 
                      data-[state=active]:bg-color/15 data-[state=active]:text-[#26A96C] rounded-md"
                >
                    <div className="flex items-center gap-3 w-full">
                        <User className="hidden lg:block h-4 w-4 shrink-0" />
                        <span className="lg:hidden text-center w-full">
                            <span className="block">Personal</span>
                            <span className="block">Details</span>
                        </span>
                        <span className="hidden lg:block">Personal Details</span>
                    </div>
                </TabsTrigger>
                <TabsTrigger
                    value="buyer-profile"
                    className="w-full flex items-center gap-3 px-2 lg:px-4 py-2 lg:py-3 
                      text-[13px] lg:text-sm font-medium text-[#3B6064] hover:bg-color/5 
                      data-[state=active]:bg-color/15 data-[state=active]:text-[#26A96C] rounded-md"
                >
                    <div className="flex items-center gap-3 w-full">
                        <Building2 className="hidden lg:block h-4 w-4 shrink-0" />
                        <span className="lg:hidden text-center w-full">
                            <span className="block">Business</span>
                            <span className="block">Profile</span>
                        </span>
                        <span className="hidden lg:block">Business Profile</span>
                    </div>
                </TabsTrigger>
                <TabsTrigger
                    value="search-criteria"
                    className="w-full flex items-center gap-3 px-2 lg:px-4 py-2 lg:py-3 
                      text-[13px] lg:text-sm font-medium text-[#3B6064] hover:bg-color/5 
                      data-[state=active]:bg-color/15 data-[state=active]:text-[#26A96C] rounded-md"
                >
                    <div className="flex items-center gap-3 w-full">
                        <Search className="hidden lg:block h-4 w-4 shrink-0" />
                        <span className="lg:hidden text-center w-full">
                            <span className="block">Search</span>
                            <span className="block">Preferences</span>
                        </span>
                        <span className="hidden lg:block">Search Preferences</span>
                    </div>
                </TabsTrigger>
            </TabsList>
        </div>
    </div>
);