import type { Profile, Link, Theme, CustomAnimation } from './types';
import { nanoid } from 'nanoid';

export const DEFAULT_PROFILE: Profile = {
  avatarUrl: `https://picsum.photos/seed/${nanoid()}/200`,
  name: '@yourname',
  bio: 'Welcome to my page! Discover my world through the links below.',
};

export const DEFAULT_LINKS: Link[] = [
  { id: nanoid(), title: 'My Website', url: '#', active: true },
  { id: nanoid(), title: 'YouTube', url: 'https://www.youtube.com', active: true },
  { id: nanoid(), title: 'Instagram', url: 'https://www.instagram.com', active: true },
  { id: nanoid(), title: 'TikTok', url: 'https://www.tiktok.com', active: true },
  { id: nanoid(), title: 'X (Twitter)', url: 'https://x.com', active: true },
  { id: nanoid(), title: 'Telegram', url: 'https://t.me', active: true },
];

export const FONT_OPTIONS = [
  { name: 'Sans Serif', value: 'font-sans' },
  { name: 'Serif', value: 'font-serif' },
  { name: 'Monospace', value: 'font-mono' },
];

export const ANIMATION_OPTIONS = [
    { name: 'None', value: 'none' },
    { name: 'Pulse', value: 'animate-subtle-pulse' },
    { name: 'Shake', value: 'animate-shake' },
    { name: 'Bounce', value: 'animate-bounce-light' },
    { name: 'Tada', value: 'animate-tada' },
];

export const CUSTOM_ANIMATION_TYPES = [
  { name: 'Pulse', value: 'subtle-pulse' },
  { name: 'Shake', value: 'shake' },
  { name: 'Bounce', value: 'bounce-light' },
  { name: 'Tada', value: 'tada' },
  { name: 'Fade In', value: 'fadeIn' },
  { name: 'Slide In Up', value: 'slideInUp' },
];

export const ANIMATION_TIMING_FUNCTIONS = [
    { name: 'Ease', value: 'ease' },
    { name: 'Linear', value: 'linear' },
    { name: 'Ease In', value: 'ease-in' },
    { name: 'Ease Out', value: 'ease-out' },
    { name: 'Ease In Out', value: 'ease-in-out' },
];

export const DEFAULT_CUSTOM_ANIMATION: CustomAnimation = {
  type: 'fadeIn',
  duration: 1,
  delay: 0,
  iterationCount: 1,
  direction: 'normal',
  timingFunction: 'ease',
};


export const BORDER_RADIUS_OPTIONS = [
  { name: 'None', value: 'rounded-none' },
  { name: 'Small', value: 'rounded-sm' },
  { name: 'Medium', value: 'rounded-md' },
  { name: 'Large', value: 'rounded-lg' },
  { name: 'Full', value: 'rounded-full' },
];

export const SHADOW_OPTIONS = [
  { name: 'None', value: 'shadow-none' },
  { name: 'Small', value: 'shadow-sm' },
  { name: 'Medium', value: 'shadow-md' },
  { name: 'Large', value: 'shadow-lg' },
  { name: 'Extra Large', value: 'shadow-xl' },
];


export const THEMES: Theme[] = [
  {
    name: 'Default',
    appearance: {
      font: 'font-sans',
      background: { type: 'color', color: '#f3f4f6' },
      linkStyle: {
        background: '#ffffff',
        textColor: '#1f2937',
        shadow: 'shadow-md',
        borderRadius: 'rounded-lg'
      },
      textColor: '#1f2937',
      animation: 'none'
    }
  },
  {
    name: 'Midnight',
    appearance: {
      font: 'font-sans',
      background: { type: 'color', color: '#111827' },
      linkStyle: {
        background: '#1f2937',
        textColor: '#f9fafb',
        shadow: 'shadow-lg shadow-blue-500/10',
        borderRadius: 'rounded-full'
      },
      textColor: '#f9fafb',
      animation: 'animate-subtle-pulse'
    }
  },
  {
    name: 'Sunset',
    appearance: {
      font: 'font-serif',
      background: { type: 'gradient', gradient: { angle: 120, start: '#ff7e5f', end: '#feb47b' } },
      linkStyle: {
        background: 'rgba(255, 255, 255, 0.2)',
        textColor: '#ffffff',
        shadow: 'shadow-none',
        borderRadius: 'rounded-md'
      },
      textColor: '#ffffff',
      animation: 'none'
    }
  },
  {
    name: 'Forest',
    appearance: {
      font: 'font-serif',
      background: { type: 'gradient', gradient: { angle: 45, start: '#2a522a', end: '#588157' } },
      linkStyle: {
        background: '#dad7cd',
        textColor: '#344e41',
        shadow: 'shadow-lg',
        borderRadius: 'rounded-lg'
      },
      textColor: '#ffffff',
      animation: 'none'
    }
  },
   {
    name: 'Bubblegum',
    appearance: {
      font: 'font-mono',
      background: { type: 'gradient', gradient: { angle: 90, start: '#ff9a9e', end: '#fecfef' } },
      linkStyle: {
        background: '#ffffff',
        textColor: '#f472b6',
        shadow: 'shadow-md',
        borderRadius: 'rounded-full'
      },
      textColor: '#4a044e',
      animation: 'animate-bounce-light'
    }
  },
  {
    name: 'Android',
    appearance: {
      font: 'font-sans',
      background: { type: 'gradient', gradient: { angle: 145, start: '#1e3a8a', end: '#4c1d95' } },
      linkStyle: {
        background: 'rgba(255, 255, 255, 0.15)',
        textColor: '#ffffff',
        shadow: 'shadow-lg',
        borderRadius: 'rounded-xl'
      },
      textColor: '#ffffff',
      layout: 'grid',
      animation: 'animate-subtle-pulse'
    }
  },
];