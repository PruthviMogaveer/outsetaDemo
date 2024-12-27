import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BuyerProfile } from '@/types/onboarding';
import { OneClickRequest } from './components/OneClickRequest';
import { PersonalInfo } from './components/PersonalInfo';
import { AddressInfo } from './components/AddressInfo';
import { BuyerTypeSelect } from './components/BuyerTypeSelect';
import { ExperienceSelect } from './components/ExperienceSelect';
import { InvestmentInput } from './components/InvestmentInput';
import { validateEmail, validatePhone, validateZipCode } from '@/lib/utils/validation';
import { useNavigate } from 'react-router-dom';

interface BuyerProfileStepProps {
  onComplete: () => void;
  onSkip: () => void;
}

const initialProfile: BuyerProfile = {
  oneClickRequest: false,
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: {
    street: '',
    city: '',
    state: '',
    zipCode: '',
  },
  buyerType: 'individual',
  experienceLevel: 'none',
  investmentAmount: 0,
};

export function BuyerProfileStep({ onComplete, onSkip }: BuyerProfileStepProps) {
  const [profile, setProfile] = useState<BuyerProfile>(initialProfile);
  const [isValid, setIsValid] = useState(false);
  const [touched, setTouched] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field: keyof BuyerProfile, value: any) => {
    setProfile(prev => {
      const updated = { ...prev, [field]: value };
      validateForm(updated);
      return updated;
    });
    setTouched(true);
  };

  const handleAddressChange = (field: keyof BuyerProfile['address'], value: string) => {
    setProfile(prev => {
      const updated = {
        ...prev,
        address: { ...prev.address, [field]: value }
      };
      validateForm(updated);
      return updated;
    });
    setTouched(true);
  };

  const validateForm = (data: BuyerProfile) => {
    const isValid = 
      data.firstName.trim() !== '' &&
      data.lastName.trim() !== '' &&
      data.email.trim() !== '' &&
      validateEmail(data.email) &&
      data.phone.trim() !== '' &&
      validatePhone(data.phone) &&
      data.address.street.trim() !== '' &&
      data.address.city.trim() !== '' &&
      data.address.state.trim() !== '' &&
      data.address.zipCode.trim() !== '' &&
      validateZipCode(data.address.zipCode) &&
      data.investmentAmount > 0;
    
    setIsValid(isValid);
  };

  const handleComplete = () => {
    onComplete();
    navigate('/dashboard');
  };

  const handleSkip = () => {
    onSkip();
    navigate('/dashboard');
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-[#03012C]">Complete Your Buyer Profile</h2>
        <p className="mt-2 text-[#3B6064]">
          Set up your profile to enable one-click requests and improve your matching
        </p>
      </div>

      <Card className="bg-white/80 border border-[#3B6064]/20 p-6">
        <div className="space-y-6">
          <OneClickRequest
            enabled={profile.oneClickRequest}
            isValid={isValid}
            onChange={(enabled) => handleInputChange('oneClickRequest', enabled)}
          />

          <PersonalInfo
            firstName={profile.firstName}
            lastName={profile.lastName}
            email={profile.email}
            phone={profile.phone}
            onChange={handleInputChange}
          />

          <AddressInfo
            address={profile.address}
            onChange={handleAddressChange}
          />

          <BuyerTypeSelect
            value={profile.buyerType}
            onChange={(value) => handleInputChange('buyerType', value)}
          />

          <ExperienceSelect
            value={profile.experienceLevel}
            onChange={(value) => handleInputChange('experienceLevel', value)}
          />

          <InvestmentInput
            value={profile.investmentAmount}
            onChange={(value) => handleInputChange('investmentAmount', value)}
          />
        </div>
      </Card>

      <div className="flex justify-between pt-4">
        <Button
          variant="outline"
          onClick={handleSkip}
          className="border-[#3B6064]/20 hover:bg-[#F9F4F0] text-[#03012C]"
        >
          Skip for Now
        </Button>
        <Button
          onClick={handleComplete}
          disabled={!isValid && touched}
          className="bg-[#26A96C] hover:bg-[#26A96C]/90 text-white"
        >
          Complete Profile
        </Button>
      </div>
    </div>
  );
}