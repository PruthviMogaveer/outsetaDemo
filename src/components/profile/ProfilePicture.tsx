import { Camera, UserCircle } from 'lucide-react';

interface ProfilePictureProps {
    profilePicture: string;
    isEditing: boolean;
    onPictureChange: (picture: string) => void;
}

export const ProfilePicture = ({ profilePicture, isEditing, onPictureChange }: ProfilePictureProps) => (
    <div className="relative group">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-[#F9F4F0] border-2 border-[#26A96C]/20 flex items-center justify-center">
            {profilePicture ? (
                <img
                    src={profilePicture}
                    alt="Profile"
                    className="w-full h-full object-cover"
                />
            ) : (
                <UserCircle className="w-20 h-20 text-[#3B6064]/50" />
            )}
        </div>
        {isEditing && (
            <label 
                htmlFor="profile-picture" 
                className="absolute inset-0 flex items-center justify-center bg-black/40 
                         rounded-full cursor-pointer opacity-0 group-hover:opacity-100 
                         transition-opacity"
            >
                <div className="flex flex-col items-center text-white">
                    <Camera className="h-5 w-5 mb-1" />
                    <span className="text-xs">Change</span>
                </div>
                <input
                    type="file"
                    id="profile-picture"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            const reader = new FileReader();
                            reader.onload = (e) => {
                                const result = e.target?.result as string;
                                onPictureChange(result);
                            };
                            reader.readAsDataURL(file);
                        }
                    }}
                />
            </label>
        )}
    </div>
);