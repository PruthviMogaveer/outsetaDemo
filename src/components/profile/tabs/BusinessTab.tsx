import { Building2, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { EditButton } from '../EditButton';
import { OnboardingSurvey, BuyerProfile } from '@/types/onboarding';
import { formatCurrency } from '@/lib/utils/validation';

interface BusinessTabProps {
    isEditing: boolean;
    setIsEditing: (value: boolean) => void;
    profile: OnboardingSurvey & Partial<BuyerProfile>;
    onUpdate: (data: Partial<OnboardingSurvey & BuyerProfile> | { [key: string]: any }) => void;
}

export const BusinessTab = ({ isEditing, setIsEditing, profile, onUpdate }: BusinessTabProps) => {
    const handleInputChange = (field: keyof (OnboardingSurvey & BuyerProfile), value: any) => {
        onUpdate({ [field]: value });
    };

    const handleAddressChange = (field: keyof BuyerProfile['address'], value: string) => {
        onUpdate({
            address: {
                ...profile.address,
                [field]: value
            }
        });
    };

    const handleToggleFunding = (value: string) => {
        const currentSources = profile.fundingSources || [];
        const newSources = currentSources.includes(value)
            ? currentSources.filter(source => source !== value)
            : [...currentSources, value];
        handleInputChange('fundingSources', newSources);
    };

    const handleToggleSupport = (value: string) => {
        const currentSupport = profile.supportNeeded || [];
        const newSupport = currentSupport.includes(value)
            ? currentSupport.filter(item => item !== value)
            : [...currentSupport, value];
        handleInputChange('supportNeeded', newSupport);
    };

    return (
        <Card className="border border-[#3B6064]/20 rounded-md">
            <CardHeader className="border-b border-[#3B6064]/20 bg-white px-6 py-4">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-[#26A96C]">Business Profile</CardTitle>
                    <EditButton isEditing={isEditing} onClick={() => setIsEditing(!isEditing)} />
                </div>
            </CardHeader>
            <CardContent className="space-y-8 p-4 sm:p-6 bg-white">
                {/* Company Information */}
                <div className="space-y-6">
                    <h3 className="text-lg font-medium text-[#03012C]">Company Information</h3>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="companyName">Company Name</Label>
                            <Input
                                id="companyName"
                                value={profile.companyName}
                                onChange={(e) => handleInputChange('companyName', e.target.value)}
                                placeholder="Enter company name"
                                className="h-11"
                                disabled={!isEditing}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="websiteUrl">Website URL (Optional)</Label>
                            <Input
                                id="websiteUrl"
                                value={profile.websiteUrl}
                                onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
                                placeholder="https://example.com"
                                className="h-11"
                                disabled={!isEditing}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="linkedinUrl">LinkedIn URL (Optional)</Label>
                            <Input
                                id="linkedinUrl"
                                value={profile.linkedinUrl}
                                onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                                placeholder="https://linkedin.com/in/username"
                                className="h-11"
                                disabled={!isEditing}
                            />
                        </div>
                    </div>
                </div>

                {/* Address Information */}
                <div className="space-y-6 pt-6 border-t border-[#3B6064]/20">
                    <h3 className="text-lg font-medium text-[#03012C]">Address Information</h3>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="street">Street Address</Label>
                            <Input
                                id="street"
                                value={profile.address?.street || ''}
                                onChange={(e) => handleAddressChange('street', e.target.value)}
                                placeholder="Enter street address"
                                className="h-11"
                                disabled={!isEditing}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="city">City</Label>
                                <Input
                                    id="city"
                                    value={profile.address?.city || ''}
                                    onChange={(e) => handleAddressChange('city', e.target.value)}
                                    placeholder="Enter city"
                                    className="h-11"
                                    disabled={!isEditing}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="state">State</Label>
                                <Input
                                    id="state"
                                    value={profile.address?.state || ''}
                                    onChange={(e) => handleAddressChange('state', e.target.value)}
                                    placeholder="Enter state"
                                    className="h-11"
                                    disabled={!isEditing}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="zipCode">ZIP Code</Label>
                                <Input
                                    id="zipCode"
                                    value={profile.address?.zipCode || ''}
                                    onChange={(e) => handleAddressChange('zipCode', e.target.value)}
                                    placeholder="Enter ZIP code"
                                    className="h-11"
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Buyer Type & Investment */}
                <div className="space-y-6 pt-6 border-t border-[#3B6064]/20">
                    <h3 className="text-lg font-medium text-[#03012C]">Buyer Information</h3>
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <Label>Buyer Type</Label>
                            <RadioGroup
                                value={profile.buyerType || 'individual'}
                                onValueChange={(value) => handleInputChange('buyerType', value)}
                                className="grid grid-cols-1 md:grid-cols-3 gap-4"
                                disabled={!isEditing}
                            >
                                {[
                                    { value: 'individual', label: 'Individual' },
                                    { value: 'privateEquity', label: 'Private Equity' },
                                    { value: 'corporation', label: 'Corporation' }
                                ].map((type) => (
                                    <div key={type.value} className="flex items-center space-x-2">
                                        <RadioGroupItem value={type.value} id={`type-${type.value}`} />
                                        <Label htmlFor={`type-${type.value}`}>{type.label}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>

                        <div className="space-y-4">
                            <Label>Experience Level</Label>
                            <RadioGroup
                                value={profile.experienceLevel || 'none'}
                                onValueChange={(value) => handleInputChange('experienceLevel', value)}
                                className="space-y-2"
                                disabled={!isEditing}
                            >
                                {[
                                    { value: 'none', label: 'Never bought/sold businesses' },
                                    { value: 'upToFive', label: 'Bought/sold up to 5 businesses' },
                                    { value: 'moreThanFive', label: 'Bought/sold more than 5 businesses' }
                                ].map((level) => (
                                    <div key={level.value} className="flex items-center space-x-2">
                                        <RadioGroupItem value={level.value} id={`level-${level.value}`} />
                                        <Label htmlFor={`level-${level.value}`}>{level.label}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="investmentAmount">Investment Amount</Label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    id="investmentAmount"
                                    type="text"
                                    value={profile.investmentAmount ? formatCurrency(profile.investmentAmount).replace('$', '') : ''}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/[^0-9]/g, '');
                                        handleInputChange('investmentAmount', Number(value));
                                    }}
                                    className="pl-10 h-11"
                                    placeholder="Enter investment amount"
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Experience & Background */}
                <div className="space-y-6 pt-6 border-t border-[#3B6064]/20">
                    <h3 className="text-lg font-medium text-[#03012C]">Experience & Background</h3>
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <Label>Business Buying Experience</Label>
                            <RadioGroup
                                value={profile.experience}
                                onValueChange={(value) => handleInputChange('experience', value)}
                                className="space-y-2"
                                disabled={!isEditing}
                            >
                                {[
                                    { value: 'expert', label: 'Expert - Have bought/sold multiple businesses' },
                                    { value: 'advanced', label: 'Advanced - Have bought/sold one business' },
                                    { value: 'intermediate', label: 'Intermediate - Experienced in the process, but no deals closed' },
                                    { value: 'basic', label: 'Basic - Working to learn and build upon the fundamentals' }
                                ].map((level) => (
                                    <div key={level.value} className="flex items-center space-x-2">
                                        <RadioGroupItem value={level.value} id={`level-${level.value}`} />
                                        <Label htmlFor={`level-${level.value}`}>{level.label}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>

                        <div className="space-y-4">
                            <Label>Career Phase</Label>
                            <RadioGroup
                                value={profile.careerPhase}
                                onValueChange={(value) => handleInputChange('careerPhase', value)}
                                className="space-y-2"
                                disabled={!isEditing}
                            >
                                {[
                                    { value: 'recentGraduate', label: 'Recent Graduate' },
                                    { value: 'earlyCareer', label: 'Early Career Professional (0-5 years)' },
                                    { value: 'midCareer', label: 'Mid-Career Professional (5-15 years)' },
                                    { value: 'seniorProfessional', label: 'Senior Professional (15+ years)' },
                                    { value: 'lateCareer', label: 'Late Career/Recently Retired' },
                                    { value: 'militaryVeteran', label: 'Military Veteran Transitioning' },
                                    { value: 'other', label: 'Other' }
                                ].map((phase) => (
                                    <div key={phase.value} className="flex items-center space-x-2">
                                        <RadioGroupItem value={phase.value} id={`phase-${phase.value}`} />
                                        <Label htmlFor={`phase-${phase.value}`}>{phase.label}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                    </div>
                </div>

                {/* Funding Sources */}
                <div className="space-y-6 pt-6 border-t border-[#3B6064]/20">
                    <h3 className="text-lg font-medium text-[#03012C]">Funding Sources</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {[
                            { value: 'personalFunds', label: 'Personal Funds' },
                            { value: 'friendsFamily', label: 'Friends & Family' },
                            { value: 'outsideInvestors', label: 'Outside Investors' },
                            { value: 'sbaLoan', label: 'SBA 7a Loan' },
                            { value: 'bankLoan', label: 'Traditional Bank Loan' },
                            { value: 'sellerFinancing', label: 'Seller Financing' }
                        ].map((source) => (
                            <div key={source.value} className="flex items-center space-x-3">
                                <Checkbox
                                    id={source.value}
                                    checked={profile.fundingSources.includes(source.value)}
                                    onCheckedChange={() => handleToggleFunding(source.value)}
                                    disabled={!isEditing}
                                    className="mt-0.5"
                                />
                                <Label
                                    htmlFor={source.value}
                                    className="text-[#3B6064] cursor-pointer leading-tight"
                                >
                                    {source.label}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Support & Expectations */}
                <div className="space-y-6 pt-6 border-t border-[#3B6064]/20">
                    <h3 className="text-lg font-medium text-[#03012C]">Support & Expectations</h3>
                    <div className="space-y-6">
                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                { value: 'dealReview', label: 'Pre-LOI Deal Review & Analysis' },
                                { value: 'dealStructuring', label: 'Deal Structuring & Negotiation Support' },
                                { value: 'sbaSupport', label: 'SBA Loan Support' },
                                { value: 'professionalServices', label: 'Professional Services (Legal, Financial, etc.)' },
                                { value: 'businessPlan', label: 'Business Plan Support' },
                                { value: 'investorIntros', label: 'Investor Introductions' }
                            ].map((option) => (
                                <div key={option.value} className="flex items-center space-x-3">
                                    <Checkbox
                                        id={option.value}
                                        checked={profile.supportNeeded.includes(option.value)}
                                        onCheckedChange={() => handleToggleSupport(option.value)}
                                        disabled={!isEditing}
                                        className="mt-0.5"
                                    />
                                    <Label
                                        htmlFor={option.value}
                                        className="text-[#3B6064] cursor-pointer leading-tight"
                                    >
                                        {option.label}
                                    </Label>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="expectations">
                                What are you most looking forward to with Search Assistant?
                            </Label>
                            <Textarea
                                id="expectations"
                                value={profile.expectations}
                                onChange={(e) => handleInputChange('expectations', e.target.value)}
                                placeholder="Share your thoughts..."
                                className="min-h-[100px] resize-none"
                                disabled={!isEditing}
                            />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};