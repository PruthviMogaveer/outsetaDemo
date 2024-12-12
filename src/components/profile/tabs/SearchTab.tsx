import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EditButton } from '../EditButton';
import { SearchCriteria } from '@/types/onboarding';
import { LocationSection } from '@/components/onboarding/search-criteria/sections/LocationSection';
import { FinancialsSection } from '@/components/onboarding/search-criteria/sections/FinancialsSection';
import { IndustrySection } from '@/components/onboarding/search-criteria/sections/IndustrySection';
import { AttributesSection } from '@/components/onboarding/search-criteria/sections/AttributesSection';

interface SearchTabProps {
    isEditing: boolean;
    setIsEditing: (value: boolean) => void;
    searchCriteria: SearchCriteria;
    onUpdate: (data: Partial<SearchCriteria>) => void;
    maxStates: number;
    maxEarnings: number;
}

export const SearchTab = ({
    isEditing,
    setIsEditing,
    searchCriteria,
    onUpdate,
    maxStates,
    maxEarnings
}: SearchTabProps) => {
    // Wrap the onUpdate function to only allow updates when editing
    const handleUpdate = (data: Partial<SearchCriteria>) => {
        if (isEditing) {
            onUpdate(data);
        }
    };

    return (
        <Card className="bg-white/80 border border-[#3B6064]/20 rounded-md">
            <CardHeader className="border-b border-[#3B6064]/20 bg-white px-6 py-4">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-[#26A96C]">Search Preferences</CardTitle>
                    <EditButton isEditing={isEditing} onClick={() => setIsEditing(!isEditing)} />
                </div>
            </CardHeader>
            <CardContent className="space-y-8 p-4 sm:p-6">
                <div className={isEditing ? '' : 'pointer-events-none opacity-75'}>
                    <LocationSection
                        data={searchCriteria}
                        onUpdate={handleUpdate}
                        maxStates={maxStates}
                    />

                    <FinancialsSection
                        data={searchCriteria}
                        onUpdate={handleUpdate}
                        maxEarnings={maxEarnings}
                    />

                    <IndustrySection
                        data={searchCriteria}
                        onUpdate={handleUpdate}
                    />

                    <AttributesSection
                        data={searchCriteria}
                        onUpdate={handleUpdate}
                    />
                </div>
            </CardContent>
        </Card>
    );
};