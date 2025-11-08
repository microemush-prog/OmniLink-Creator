import React, { useState, useEffect } from 'react';
import type { Appearance, CustomAnimation } from '../types';
import { THEMES, FONT_OPTIONS, ANIMATION_OPTIONS, BORDER_RADIUS_OPTIONS, SHADOW_OPTIONS, CUSTOM_ANIMATION_TYPES, DEFAULT_CUSTOM_ANIMATION, ANIMATION_TIMING_FUNCTIONS } from '../constants';
import { Label } from './ui/Label';
import { Select } from './ui/Select';
import { ColorInput } from './ui/ColorInput';
import { RangeInput } from './ui/RangeInput';
import { TuneIcon } from './icons/EditorIcons';

interface AppearanceEditorProps {
  appearance: Appearance;
  setAppearance: React.Dispatch<React.SetStateAction<Appearance>>;
}

const areAppearancesEqual = (a: Appearance, b: Appearance): boolean => {
  try {
    return JSON.stringify(a) === JSON.stringify(b);
  } catch (error) {
    return false;
  }
};


export const AppearanceEditor: React.FC<AppearanceEditorProps> = ({ appearance, setAppearance }) => {
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [isCustomizingAnimation, setIsCustomizingAnimation] = useState(false);

  useEffect(() => {
    const isPresetTheme = THEMES.some(theme => areAppearancesEqual(theme.appearance, appearance));
    if (!isPresetTheme) {
      setIsCustomizing(true);
    }
  }, [appearance]);
  
  useEffect(() => {
    const anim = appearance.animation;
    if (typeof anim === 'object') {
        setIsCustomizingAnimation(true);
    } else {
        setIsCustomizingAnimation(false);
    }
  }, [appearance.animation]);


  const handleThemeChange = (themeName: string) => {
    const selectedTheme = THEMES.find(t => t.name === themeName);
    if (selectedTheme) {
      setAppearance(selectedTheme.appearance);
      setIsCustomizing(false);
    }
  };
  
  const handleCustomThemeClick = () => {
    setIsCustomizing(true);
    const isPresetTheme = THEMES.some(theme => areAppearancesEqual(theme.appearance, appearance));
    if (isPresetTheme) {
        // To prevent instant reverting, we can slightly modify the appearance
        // A simple way is to change an unused property or just rely on the state
    }
  }

  const handleFontChange = (fontValue: string) => {
    setAppearance(prev => ({ ...prev, font: fontValue }));
  };

  const handleAnimationChange = (animationValue: string) => {
    setAppearance(prev => ({ ...prev, animation: animationValue === 'none' ? undefined : animationValue }));
  };
  
  const handleCustomAnimationClick = () => {
    if (typeof appearance.animation !== 'object') {
      setAppearance(prev => ({...prev, animation: DEFAULT_CUSTOM_ANIMATION}));
    }
    setIsCustomizingAnimation(true);
  }
  
  const handleCustomAnimationChange = <K extends keyof CustomAnimation>(key: K, value: CustomAnimation[K]) => {
    setAppearance(prev => {
        const currentAnim = typeof prev.animation === 'object' ? prev.animation : DEFAULT_CUSTOM_ANIMATION;
        return {
            ...prev,
            animation: {
                ...currentAnim,
                [key]: value
            }
        }
    });
  }

  const handleAppearanceChange = <K extends keyof Appearance>(key: K, value: Appearance[K]) => {
    setAppearance(prev => ({ ...prev, [key]: value }));
  };

  const handleBackgroundChange = <K extends keyof Appearance['background']>(key: K, value: Appearance['background'][K]) => {
    setAppearance(prev => ({
      ...prev,
      background: { ...prev.background, [key]: value },
    }));
  };

  const handleGradientChange = <K extends keyof NonNullable<Appearance['background']['gradient']>>(key: K, value: NonNullable<Appearance['background']['gradient']>[K]) => {
    setAppearance(prev => ({
      ...prev,
      background: {
        ...prev.background,
        gradient: {
          ...(prev.background.gradient || { angle: 90, start: '#ffffff', end: '#000000' }),
          [key]: value
        }
      },
    }));
  };
  
  const handleLinkStyleChange = <K extends keyof Appearance['linkStyle']>(key: K, value: Appearance['linkStyle'][K]) => {
     setAppearance(prev => ({
      ...prev,
      linkStyle: { ...prev.linkStyle, [key]: value },
    }));
  };
  
  const CustomAnimationPanel = () => {
    const anim = typeof appearance.animation === 'object' ? appearance.animation : DEFAULT_CUSTOM_ANIMATION;
    
    return (
    <div className="space-y-4 p-4 mt-4 rounded-lg bg-gray-50 dark:bg-gray-900/50">
        <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">Custom Animation</h4>
        <div>
            <Label>Type</Label>
            <Select value={anim.type} onChange={(e) => handleCustomAnimationChange('type', e.target.value as CustomAnimation['type'])}>
                {CUSTOM_ANIMATION_TYPES.map(opt => <option key={opt.value} value={opt.value}>{opt.name}</option>)}
            </Select>
        </div>
        <div>
            <Label>Duration ({anim.duration.toFixed(1)}s)</Label>
            <RangeInput min="0.1" max="5" step="0.1" value={anim.duration} onChange={(e) => handleCustomAnimationChange('duration', parseFloat(e.target.value))} />
        </div>
         <div>
            <Label>Delay ({anim.delay.toFixed(1)}s)</Label>
            <RangeInput min="0" max="5" step="0.1" value={anim.delay} onChange={(e) => handleCustomAnimationChange('delay', parseFloat(e.target.value))} />
        </div>
        <div>
            <Label>Iterations</Label>
            <Select value={anim.iterationCount} onChange={(e) => handleCustomAnimationChange('iterationCount', e.target.value === 'infinite' ? 'infinite' : parseInt(e.target.value))}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="5">5</option>
                <option value="infinite">Infinite</option>
            </Select>
        </div>
        <div>
            <Label>Direction</Label>
            <Select value={anim.direction} onChange={(e) => handleCustomAnimationChange('direction', e.target.value as CustomAnimation['direction'])}>
                <option value="normal">Normal</option>
                <option value="reverse">Reverse</option>
                <option value="alternate">Alternate</option>
            </Select>
        </div>
        <div>
            <Label>Timing Function</Label>
            <Select value={anim.timingFunction} onChange={(e) => handleCustomAnimationChange('timingFunction', e.target.value as CustomAnimation['timingFunction'])}>
                {ANIMATION_TIMING_FUNCTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.name}</option>)}
            </Select>
        </div>
    </div>
    )
  }

  const CustomizationPanel = () => (
    <div className="space-y-6 pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
      <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">Customization</h4>

      <div className="space-y-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50">
        <Label>Background</Label>
        <div className="flex items-center gap-2">
          {(['color', 'gradient'] as const).map(type => (
            <button key={type} onClick={() => handleBackgroundChange('type', type)} className={`px-3 py-1 text-sm rounded-md capitalize transition-colors ${appearance.background.type === type ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'}`}>{type}</button>
          ))}
        </div>
        {appearance.background.type === 'color' ? (
          <ColorInput value={appearance.background.color || '#ffffff'} onChange={(e) => handleBackgroundChange('color', e.target.value)} />
        ) : (
          <div className="space-y-3">
            <div>
              <Label>Start Color</Label>
              <ColorInput value={appearance.background.gradient?.start || '#ff7e5f'} onChange={(e) => handleGradientChange('start', e.target.value)} />
            </div>
            <div>
              <Label>End Color</Label>
              <ColorInput value={appearance.background.gradient?.end || '#feb47b'} onChange={(e) => handleGradientChange('end', e.target.value)} />
            </div>
            <div>
                <Label>Angle ({appearance.background.gradient?.angle || 0}deg)</Label>
                <RangeInput min="0" max="360" value={appearance.background.gradient?.angle || 0} onChange={(e) => handleGradientChange('angle', parseInt(e.target.value, 10))} />
            </div>
          </div>
        )}
      </div>
      
      <div className="space-y-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50">
        <Label>Links</Label>
        <div>
            <Label>Background</Label>
            <ColorInput value={appearance.linkStyle.background} onChange={(e) => handleLinkStyleChange('background', e.target.value)} />
        </div>
         <div>
            <Label>Text Color</Label>
            <ColorInput value={appearance.linkStyle.textColor} onChange={(e) => handleLinkStyleChange('textColor', e.target.value)} />
        </div>
        <div>
          <Label htmlFor="border-radius-select">Border Radius</Label>
          <Select id="border-radius-select" value={appearance.linkStyle.borderRadius} onChange={e => handleLinkStyleChange('borderRadius', e.target.value)}>
            {BORDER_RADIUS_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.name}</option>)}
          </Select>
        </div>
        <div>
          <Label htmlFor="shadow-select">Shadow</Label>
          <Select id="shadow-select" value={appearance.linkStyle.shadow} onChange={e => handleLinkStyleChange('shadow', e.target.value)}>
            {SHADOW_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.name}</option>)}
          </Select>
        </div>
      </div>
      
      <div className="space-y-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50">
        <Label>Page Text</Label>
        <ColorInput value={appearance.textColor} onChange={(e) => handleAppearanceChange('textColor', e.target.value)} />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Appearance</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Personalize the look and feel of your page.</p>
      </div>

      <div className="space-y-8">
        <div>
          <Label>Themes</Label>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-2">
            {THEMES.map(theme => (
              <button
                key={theme.name}
                onClick={() => handleThemeChange(theme.name)}
                className="text-center group"
                aria-label={`Select ${theme.name} theme`}
              >
                <div
                  className={`w-full h-16 rounded-lg border-2 transition-all ${
                    !isCustomizing && areAppearancesEqual(appearance, theme.appearance) ? 'border-indigo-500 ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-gray-800' : 'border-gray-300 dark:border-gray-600 group-hover:border-indigo-400'
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
            <button
              onClick={handleCustomThemeClick}
              className="text-center group"
              aria-label="Customize theme"
            >
              <div
                className={`w-full h-16 rounded-lg border-2 transition-all flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 ${
                  isCustomizing ? 'border-indigo-500 ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-gray-800' : 'border-gray-300 dark:border-gray-600 group-hover:border-indigo-400'
                }`}
              >
                <TuneIcon className="w-8 h-8"/>
              </div>
              <span className="text-xs mt-2 block text-gray-600 dark:text-gray-300">Custom</span>
            </button>
          </div>
        </div>

        {isCustomizing && <CustomizationPanel />}

        <div>
          <Label>Animation</Label>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-2">
            {ANIMATION_OPTIONS.map(anim => (
              <button
                key={anim.name}
                onClick={() => handleAnimationChange(anim.value)}
                className="text-center group"
                aria-label={`Select ${anim.name} animation`}
              >
                <div
                  className={`w-full h-12 rounded-lg border-2 flex items-center justify-center transition-all ${
                    !isCustomizingAnimation && (appearance.animation || 'none') === anim.value
                      ? 'border-indigo-500 ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-gray-800'
                      : 'border-gray-300 dark:border-gray-600 group-hover:border-indigo-400'
                  } ${anim.value !== 'none' ? anim.value : 'group-hover:scale-105'}`}
                  style={{
                    backgroundColor: appearance.linkStyle.background,
                    animationIterationCount: anim.name === 'Shake' ? '1' : 'infinite',
                    animationDuration: anim.name === 'Shake' ? '0.8s' : '1.5s'
                  }}
                >
                  <span className="text-sm font-bold select-none" style={{ color: appearance.linkStyle.textColor }}>Aa</span>
                </div>
                <span className="text-xs mt-2 block text-gray-600 dark:text-gray-300">{anim.name}</span>
              </button>
            ))}
             <button
              onClick={handleCustomAnimationClick}
              className="text-center group"
              aria-label="Customize animation"
            >
              <div
                className={`w-full h-12 rounded-lg border-2 transition-all flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 ${
                  isCustomizingAnimation ? 'border-indigo-500 ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-gray-800' : 'border-gray-300 dark:border-gray-600 group-hover:border-indigo-400'
                }`}
              >
                <TuneIcon className="w-6 h-6"/>
              </div>
              <span className="text-xs mt-2 block text-gray-600 dark:text-gray-300">Custom</span>
            </button>
          </div>
          {isCustomizingAnimation && <CustomAnimationPanel />}
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