import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { validateZipCode } from '@/lib/utils/validation';
import { AlertCircle } from 'lucide-react';

interface AddressInfoProps {
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  onChange: (field: string, value: string) => void;
}

export function AddressInfo({ address, onChange }: AddressInfoProps) {
  const isZipCodeValid = address.zipCode === '' || validateZipCode(address.zipCode);

  return (
    <div className="space-y-4">
      <Label>Address *</Label>
      <div className="grid gap-4">
        <div>
          <Input
            placeholder="Street Address"
            value={address.street}
            onChange={(e) => onChange('street', e.target.value)}
            className={address.street === '' ? 'border-red-300 focus:border-red-300' : ''}
          />
          {address.street === '' && (
            <p className="text-red-500 text-sm flex items-center mt-1">
              <AlertCircle className="h-4 w-4 mr-1" />
              Street address is required
            </p>
          )}
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <Input
              placeholder="City"
              value={address.city}
              onChange={(e) => onChange('city', e.target.value)}
              className={address.city === '' ? 'border-red-300 focus:border-red-300' : ''}
            />
            {address.city === '' && (
              <p className="text-red-500 text-sm flex items-center mt-1">
                <AlertCircle className="h-4 w-4 mr-1" />
                City is required
              </p>
            )}
          </div>

          <div>
            <Input
              placeholder="State"
              value={address.state}
              onChange={(e) => onChange('state', e.target.value)}
              className={address.state === '' ? 'border-red-300 focus:border-red-300' : ''}
            />
            {address.state === '' && (
              <p className="text-red-500 text-sm flex items-center mt-1">
                <AlertCircle className="h-4 w-4 mr-1" />
                State is required
              </p>
            )}
          </div>

          <div>
            <Input
              placeholder="ZIP Code"
              value={address.zipCode}
              onChange={(e) => onChange('zipCode', e.target.value)}
              className={!isZipCodeValid ? 'border-red-300 focus:border-red-300' : ''}
            />
            {!isZipCodeValid && address.zipCode !== '' && (
              <p className="text-red-500 text-sm flex items-center mt-1">
                <AlertCircle className="h-4 w-4 mr-1" />
                Enter valid ZIP code
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}