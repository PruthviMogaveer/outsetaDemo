import { Mail, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EditButton } from '../EditButton';
import { ProfilePicture } from '../ProfilePicture';
import { validateEmail, validatePhone } from '@/lib/utils/validation';
import { AlertCircle } from 'lucide-react';

interface PersonalTabProps {
    isEditing: boolean;
    setIsEditing: (value: boolean) => void;
    userData: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
    };
    profilePicture: string;
    setProfilePicture: (value: string) => void;
    onUpdate: (field: string, value: string) => void;
}

export const PersonalTab = ({
    isEditing,
    setIsEditing,
    userData,
    profilePicture,
    setProfilePicture,
    onUpdate
}: PersonalTabProps) => {
    const isEmailValid = userData.email === '' || validateEmail(userData.email);
    const isPhoneValid = userData.phone === '' || validatePhone(userData.phone);

    return (
        <Card className="bg-white/80 border border-[#3B6064]/20 rounded-md">
            <CardHeader className="border-b border-[#3B6064]/20 bg-white px-6 py-4">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-[#26A96C]">Personal Information</CardTitle>
                    <EditButton isEditing={isEditing} onClick={() => setIsEditing(!isEditing)} />
                </div>
            </CardHeader>
            <CardContent className="space-y-6 p-4 sm:p-6">
                <div className="flex flex-col items-center sm:items-start sm:flex-row gap-6 pb-6 border-b border-[#3B6064]/10">
                    <ProfilePicture
                        profilePicture={profilePicture}
                        isEditing={isEditing}
                        onPictureChange={setProfilePicture}
                    />
                    
                    <div className="space-y-2">
                        <h3 className="text-lg font-medium text-[#03012C]">
                            {userData.firstName} {userData.lastName}
                        </h3>
                        <p className="text-sm text-[#3B6064]">{userData.email}</p>
                        {isEditing && (
                            <p className="text-xs text-[#3B6064]">
                                Recommended: Square image, at least 400x400px
                            </p>
                        )}
                    </div>
                </div>

                <div className="grid gap-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label className="text-sm font-medium text-[#3B6064]">
                                First Name
                            </Label>
                            <Input
                                id="firstName"
                                value={userData.firstName}
                                onChange={(e) => onUpdate('firstName', e.target.value)}
                                placeholder="Enter your first name"
                                className="h-11"
                                disabled={!isEditing}
                            />
                            {userData.firstName === '' && (
                                <p className="text-red-500 text-sm flex items-center mt-1">
                                    <AlertCircle className="h-4 w-4 mr-1" />
                                    First name is required
                                </p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label className="text-sm font-medium text-[#3B6064]">
                                Last Name
                            </Label>
                            <Input
                                id="lastName"
                                value={userData.lastName}
                                onChange={(e) => onUpdate('lastName', e.target.value)}
                                placeholder="Enter your last name"
                                className="h-11"
                                disabled={!isEditing}
                            />
                            {userData.lastName === '' && (
                                <p className="text-red-500 text-sm flex items-center mt-1">
                                    <AlertCircle className="h-4 w-4 mr-1" />
                                    Last name is required
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                            <Input
                                id="email"
                                type="email"
                                value={userData.email}
                                onChange={(e) => onUpdate('email', e.target.value)}
                                className="pl-10 h-11"
                                placeholder="Enter your email"
                                disabled={!isEditing}
                            />
                        </div>
                        {!isEmailValid && userData.email !== '' && (
                            <p className="text-red-500 text-sm flex items-center mt-1">
                                <AlertCircle className="h-4 w-4 mr-1" />
                                Please enter a valid email address
                            </p>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                            <Input
                                id="phone"
                                type="tel"
                                value={userData.phone}
                                onChange={(e) => onUpdate('phone', e.target.value)}
                                className="pl-10 h-11"
                                placeholder="Enter your phone number"
                                disabled={!isEditing}
                            />
                        </div>
                        {!isPhoneValid && userData.phone !== '' && (
                            <p className="text-red-500 text-sm flex items-center mt-1">
                                <AlertCircle className="h-4 w-4 mr-1" />
                                Please enter a valid phone number
                            </p>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};