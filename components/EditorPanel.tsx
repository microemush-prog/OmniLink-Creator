
import React, { useState } from 'react';
import type { Profile, Link, Appearance } from '../types';
import { ProfileEditor } from './ProfileEditor';
import { LinksEditor } from './LinksEditor';
import { AppearanceEditor } from './AppearanceEditor';
import { UserIcon, LinkIcon, PaintBrushIcon } from './icons/EditorIcons';

interface EditorPanelProps {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
  links: Link[];
  setLinks: React.Dispatch<React.SetStateAction<Link[]>>;
  appearance: Appearance;
  setAppearance: React.Dispatch<React.SetStateAction<Appearance>>;
  moveLink: (dragIndex: number, hoverIndex: number) => void;
}

type Tab = 'profile' | 'links' | 'appearance';

export const EditorPanel: React.FC<EditorPanelProps> = (props) => {
  const [activeTab, setActiveTab] = useState<Tab>('links');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileEditor profile={props.profile} setProfile={props.setProfile} />;
      case 'links':
        return <LinksEditor links={props.links} setLinks={props.setLinks} moveLink={props.moveLink} />;
      case 'appearance':
        return <AppearanceEditor appearance={props.appearance} setAppearance={props.setAppearance} />;
      default:
        return null;
    }
  };
  
  const TabButton: React.FC<{ tabName: Tab; icon: React.ReactNode; label: string }> = ({ tabName, icon, label }) => {
    const isActive = activeTab === tabName;
    return (
      <button
        onClick={() => setActiveTab(tabName)}
        className={`flex-1 flex items-center justify-center gap-2 p-3 text-sm font-medium rounded-t-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500
          ${isActive 
            ? 'bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-500' 
            : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-700 dark:hover:text-gray-200'
          }`
        }
      >
        {icon}
        {label}
      </button>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <TabButton tabName="links" icon={<LinkIcon />} label="Links" />
        <TabButton tabName="profile" icon={<UserIcon />} label="Profile" />
        <TabButton tabName="appearance" icon={<PaintBrushIcon />} label="Appearance" />
      </div>
      <div className="p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};
