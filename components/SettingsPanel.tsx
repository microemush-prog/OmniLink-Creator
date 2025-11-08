
import React from 'react';
import type { Profile, Link, Appearance } from '../types';
import { ProfileEditor } from './ProfileEditor';
import { LinksEditor } from './LinksEditor';
import { AppearanceEditor } from './AppearanceEditor';
import { XMarkIcon } from './icons/EditorIcons';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
  links: Link[];
  setLinks: React.Dispatch<React.SetStateAction<Link[]>>;
  appearance: Appearance;
  setAppearance: React.Dispatch<React.SetStateAction<Appearance>>;
  moveLink: (dragIndex: number, hoverIndex: number) => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = (props) => {
  return (
    <div 
      className={`fixed inset-0 z-40 transition-all duration-300 ease-in-out ${
        props.isOpen ? 'bg-black/50' : 'bg-transparent pointer-events-none'
      }`}
      onClick={props.onClose}
      aria-hidden={!props.isOpen}
    >
      <div 
        className={`fixed top-0 left-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          props.isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-panel-title"
      >
        <div className="flex flex-col h-full">
          <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
            <h2 id="settings-panel-title" className="text-lg font-semibold text-gray-900 dark:text-white">Customize Your Page</h2>
            <button 
              onClick={props.onClose} 
              className="p-1 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Close settings"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </header>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            <div>
              <LinksEditor links={props.links} setLinks={props.setLinks} moveLink={props.moveLink} />
            </div>
            <hr className="border-gray-200 dark:border-gray-700" />
            <div>
              <ProfileEditor profile={props.profile} setProfile={props.setProfile} />
            </div>
            <hr className="border-gray-200 dark:border-gray-700" />
            <div>
              <AppearanceEditor appearance={props.appearance} setAppearance={props.setAppearance} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
