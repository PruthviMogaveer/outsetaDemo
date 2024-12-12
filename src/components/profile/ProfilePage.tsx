import { useState } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Header } from './Header';
import { Navigation } from './Navigation';
import { PersonalTab } from './tabs/PersonalTab';
import { BusinessTab } from './tabs/BusinessTab';
import { SearchTab } from './tabs/SearchTab';
import { OnboardingSurvey, SearchCriteria } from '@/types/onboarding';
import { useNavigate } from 'react-router-dom';

interface ProfilePageProps {
    onBack?: () => void;
}

const initialUserData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
};

const initialSurveyData: OnboardingSurvey = {
    companyName: '',
    websiteUrl: '',
    linkedinUrl: '',
    buyerType: 'businessOwner',
    experience: 'basic',
    careerPhase: 'earlyCareer',
    fundingSources: [],
    supportNeeded: [],
    expectations: ''
};

const initialSearchCriteria: SearchCriteria = {
    location: {
        states: [],
        priorityMetros: [],
        excludedMetros: []
    },
    earnings: {
        floorMin: 0,
        floorIdeal: 0,
        ceilingIdeal: 0,
        ceilingMax: 0,
        marginIdeal: 0,
        marginMin: 0
    },
    askingMultiple: {
        ideal: 3,
        max: 5
    },
    industry: {
        categories: [],
        subcategories: []
    },
    businessTags: [],
    franchise: 'non-franchise',
    yearsInBusiness: {
        idealMin: 0,
        trueMin: 0
    },
    employees: {
        idealMin: 0,
        trueMin: 0
    },
    excludePoorQuality: false
};

export const ProfilePage = ({ onBack }: ProfilePageProps) => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState(initialUserData);
    const [profilePicture, setProfilePicture] = useState<string>("");
    const [surveyData, setSurveyData] = useState<OnboardingSurvey>(initialSurveyData);
    const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>(initialSearchCriteria);

    const handleUserDataUpdate = (field: string, value: string) => {
        setUserData(prev => ({ ...prev, [field]: value }));
    };

    const handleSurveyDataUpdate = (data: Partial<OnboardingSurvey>) => {
        setSurveyData(prev => ({ ...prev, ...data }));
    };

    const handleSearchCriteriaUpdate = (data: Partial<SearchCriteria>) => {
        setSearchCriteria(prev => ({ ...prev, ...data }));
    };

    const handleBack = () => {
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen ">
            <Header onBack={handleBack} />

            <main className="pt-24 pb-16 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    <Tabs defaultValue="user-details" className="flex flex-col lg:flex-row gap-6">
                        <Navigation />

                        <div className="flex-1 space-y-6">
                            <TabsContent value="user-details" className="mt-0 focus-visible:outline-none">
                                <PersonalTab
                                    isEditing={isEditing}
                                    setIsEditing={setIsEditing}
                                    userData={userData}
                                    profilePicture={profilePicture}
                                    setProfilePicture={setProfilePicture}
                                    onUpdate={handleUserDataUpdate}
                                />
                            </TabsContent>

                            <TabsContent value="buyer-profile" className="mt-0">
                                <BusinessTab
                                    isEditing={isEditing}
                                    setIsEditing={setIsEditing}
                                    profile={surveyData}
                                    onUpdate={handleSurveyDataUpdate}
                                />
                            </TabsContent>

                            <TabsContent value="search-criteria" className="mt-0">
                                <SearchTab
                                    isEditing={isEditing}
                                    setIsEditing={setIsEditing}
                                    searchCriteria={searchCriteria}
                                    onUpdate={handleSearchCriteriaUpdate}
                                    maxStates={4}
                                    maxEarnings={2000000}
                                />
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>
            </main>
        </div>
    );
};