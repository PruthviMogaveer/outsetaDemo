import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { validateEmail, validatePhone } from '@/lib/utils/validation';
import { AlertCircle } from 'lucide-react';

interface PersonalInfoProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  onChange: (field: string, value: string) => void;
}

export function PersonalInfo({ firstName, lastName, email, phone, onChange }: PersonalInfoProps) {
  const isEmailValid = email === '' || validateEmail(email);
  const isPhoneValid = phone === '' || validatePhone(phone);

  return (
    <>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={firstName}
            onChange={(e) => onChange('firstName', e.target.value)}
            placeholder="Enter your first name"
            className={firstName === '' ? 'border-red-300 focus:border-red-300' : ''}
          />
          {firstName === '' && (
            <p className="text-red-500 text-sm flex items-center mt-1">
              <AlertCircle className="h-4 w-4 mr-1" />
              First name is required
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={lastName}
            onChange={(e) => onChange('lastName', e.target.value)}
            placeholder="Enter your last name"
            className={lastName === '' ? 'border-red-300 focus:border-red-300' : ''}
          />
          {lastName === '' && (
            <p className="text-red-500 text-sm flex items-center mt-1">
              <AlertCircle className="h-4 w-4 mr-1" />
              Last name is required
            </p>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => onChange('email', e.target.value)}
            placeholder="Enter your email"
            className={!isEmailValid ? 'border-red-300 focus:border-red-300' : ''}
          />
          {!isEmailValid && email !== '' && (
            <p className="text-red-500 text-sm flex items-center mt-1">
              <AlertCircle className="h-4 w-4 mr-1" />
              Please enter a valid email address
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => onChange('phone', e.target.value)}
            placeholder="Enter your phone number"
            className={!isPhoneValid ? 'border-red-300 focus:border-red-300' : ''}
          />
          {!isPhoneValid && phone !== '' && (
            <p className="text-red-500 text-sm flex items-center mt-1">
              <AlertCircle className="h-4 w-4 mr-1" />
              Please enter a valid phone number
            </p>
          )}
        </div>
      </div>
    </>
  );
}