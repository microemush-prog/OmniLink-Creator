
import React, { useState, useEffect, useCallback } from 'react';
import { SettingsPanel } from './components/SettingsPanel';
import { Preview } from './components/Preview';
import type { Profile, Link, Appearance } from './types';
import { DEFAULT_PROFILE, DEFAULT_LINKS, THEMES } from './constants';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { SettingsIcon } from './components/icons/EditorIcons';

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);
  const [links, setLinks] = useState<Link[]>(DEFAULT_LINKS);
  const [appearance, setAppearance] = useState<Appearance>(THEMES[0].appearance);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    try {
      const savedData = localStorage.getItem('omniLinkData');
      if (savedData) {
        const { profile, links, appearance } = JSON.parse(savedData);
        if (profile) setProfile(profile);
        if (links) setLinks(links);
        if (appearance) setAppearance(appearance);
      }
    } catch (error) {
      console.error("Failed to load data from localStorage", error);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        const dataToSave = JSON.stringify({ profile, links, appearance });
        localStorage.setItem('omniLinkData', dataToSave);
      } catch (error) {
        console.error("Failed to save data to localStorage", error);
      }
    }
  }, [profile, links, appearance, isLoaded]);

  const moveLink = useCallback((dragIndex: number, hoverIndex: number) => {
    setLinks(prevLinks => {
      const newLinks = [...prevLinks];
      const [draggedLink] = newLinks.splice(dragIndex, 1);
      newLinks.splice(hoverIndex, 0, draggedLink);
      return newLinks;
    });
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 font-sans text-gray-800 dark:text-gray-200">
        <header className="bg-white dark:bg-gray-800/50 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Omni<span className="text-indigo-500">Link</span> Creator
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Everything you are, in one simple link.</p>
          </div>
        </header>

        <main className="relative flex flex-col items-center justify-start p-4 sm:p-6 lg:p-8">
           <div className="w-full max-w-sm mt-8">
              <h2 className="text-lg font-semibold mb-4 text-center text-gray-700 dark:text-gray-300">Live Preview</h2>
              <Preview profile={profile} links={links} appearance={appearance} />
           </div>
        </main>

        <div className="fixed bottom-6 right-6 z-30">
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-4 shadow-lg transform hover:scale-110 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            aria-label="Open settings"
          >
            <SettingsIcon className="w-6 h-6"/>
          </button>
        </div>

        <SettingsPanel
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          profile={profile}
          setProfile={setProfile}
          links={links}
          setLinks={setLinks}
          appearance={appearance}
          setAppearance={setAppearance}
          moveLink={moveLink}
        />
      </div>
    </DndProvider>
  );
};

export default App;
