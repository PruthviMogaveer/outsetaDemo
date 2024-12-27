import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AddressInfoProps {
  address: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
  onChange: (field: keyof AddressInfoProps['address'], value: string) => void;
}

export function AddressInfo({ address, onChange }: AddressInfoProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="street">Street Address</Label>
        <Input
          id="street"
          value={address.street || ''}
          onChange={(e) => onChange('street', e.target.value)}
          placeholder="Enter your street address"
          className="h-11"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            value={address.city || ''}
            onChange={(e) => onChange('city', e.target.value)}
            placeholder="Enter city"
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            value={address.state || ''}
            onChange={(e) => onChange('state', e.target.value)}
            placeholder="Enter state"
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="zipCode">ZIP Code</Label>
          <Input
            id="zipCode"
            value={address.zipCode || ''}
            onChange={(e) => onChange('zipCode', e.target.value)}
            placeholder="Enter ZIP code"
            className="h-11"
          />
        </div>
      </div>
    </div>
  );
}