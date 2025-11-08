
import React from 'react';
import type { Appearance } from '../types';
import { THEMES, FONT_OPTIONS } from '../constants';
import { Label } from './ui/Label';
import { Select } from './ui/Select';

interface AppearanceEditorProps {
  appearance: Appearance;
  setAppearance: React.Dispatch<React.SetStateAction<Appearance>>;
}

export const AppearanceEditor: React.FC<AppearanceEditorProps> = ({ appearance, setAppearance }) => {
  
  const handleThemeChange = (themeName: string) => {
    const selectedTheme = THEMES.find(t => t.name === themeName);
    if (selectedTheme) {
      setAppearance(selectedTheme.appearance);
    }
  };

  const handleFontChange = (fontValue: string) => {
    setAppearance(prev => ({...prev, font: fontValue }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Appearance</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Personalize the look and feel of your page.</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Themes</Label>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mt-2">
            {THEMES.map(theme => (
              <button 
                key={theme.name}
                onClick={() => handleThemeChange(theme.name)}
                className="text-center group"
              >
                <div 
                  className={`w-full h-16 rounded-lg border-2 transition-all ${
                    appearance.background.color === theme.appearance.background.color && appearance.background.gradient?.start === theme.appearance.background.gradient?.start ? 'border-indigo-500 ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-gray-800' : 'border-gray-300 dark:border-gray-600 group-hover:border-indigo-400'
                  }`}
                  style={theme.appearance.background.type === 'gradient' ? {
                    background: `linear-gradient(${theme.appearance.background.gradient?.angle}deg, ${theme.appearance.background.gradient?.start}, ${theme.appearance.background.gradient?.end})`
                  } : {
                    backgroundColor: theme.appearance.background.color
                  }}
                ></div>
                <span className="text-xs mt-2 block text-gray-600 dark:text-gray-300">{theme.name}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <Label htmlFor="font-select">Font</Label>
          <Select 
            id="font-select"
            value={appearance.font}
            onChange={e => handleFontChange(e.target.value)}
          >
            {FONT_OPTIONS.map(font => (
              <option key={font.value} value={font.value}>{font.name}</option>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
};
