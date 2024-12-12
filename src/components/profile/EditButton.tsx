import { Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EditButtonProps {
    isEditing: boolean;
    onClick: () => void;
}

export const EditButton = ({ isEditing, onClick }: EditButtonProps) => (
    <Button
        variant="outline"
        size="sm"
        onClick={onClick}
        className="text-[#26A96C] bg-color/5 hover:bg-color/10 
                  border border-[#3B6064]/20"
    >
        <Edit2 className="h-4 w-4 mr-2" />
        {isEditing ? 'Cancel Edit' : 'Edit Profile'}
    </Button>
);