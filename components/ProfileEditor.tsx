
import React from 'react';
import type { Profile } from '../types';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import { Label } from './ui/Label';

interface ProfileEditorProps {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
}

export const ProfileEditor: React.FC<ProfileEditorProps> = ({ profile, setProfile }) => {
  const handleProfileChange = <K extends keyof Profile>(key: K, value: Profile[K]) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Profile</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Customize your public information.</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="avatarUrl">Avatar URL</Label>
          <Input 
            id="avatarUrl"
            type="text"
            value={profile.avatarUrl}
            onChange={(e) => handleProfileChange('avatarUrl', e.target.value)}
            placeholder="https://example.com/avatar.png"
          />
        </div>
        <div>
          <Label htmlFor="name">Display Name</Label>
          <Input 
            id="name"
            type="text"
            value={profile.name}
            onChange={(e) => handleProfileChange('name', e.target.value)}
            placeholder="@yourname"
          />
        </div>
        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea 
            id="bio"
            value={profile.bio}
            onChange={(e) => handleProfileChange('bio', e.target.value)}
            placeholder="A short description about you."
            rows={3}
          />
        </div>
      </div>
    </div>
  );
};
