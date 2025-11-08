import React from 'react';
import type { Profile, Link, Appearance } from '../types';
import {
  YouTubeIcon,
  TikTokIcon,
  InstagramIcon,
  TelegramIcon,
  XIcon,
  LinkSimpleIcon
} from './icons/SocialIcons';

interface PreviewProps {
  profile: Profile;
  links: Link[];
  appearance: Appearance;
}

const getLinkIcon = (link: Link) => {
  const url = link.url.toLowerCase();
  const title = link.title.toLowerCase();

  if (url.includes('youtube.com') || url.includes('youtu.be') || title.includes('youtube')) {
    return <YouTubeIcon />;
  }
  if (url.includes('tiktok.com') || title.includes('tiktok')) {
    return <TikTokIcon />;
  }
  if (url.includes('instagram.com') || title.includes('instagram')) {
    return <InstagramIcon />;
  }
  if (url.includes('t.me') || url.includes('telegram.org') || title.includes('telegram')) {
    return <TelegramIcon />;
  }
  if (url.includes('x.com') || url.includes('twitter.com') || title.includes('x') || title.includes('twitter')) {
    return <XIcon />;
  }
  return <LinkSimpleIcon />;
};

export const Preview: React.FC<PreviewProps> = ({ profile, links, appearance }) => {

  const backgroundStyle = (): React.CSSProperties => {
    if (appearance.background.type === 'gradient' && appearance.background.gradient) {
      return {
        background: `linear-gradient(${appearance.background.gradient.angle}deg, ${appearance.background.gradient.start}, ${appearance.background.gradient.end})`
      };
    }
    return {
      backgroundColor: appearance.background.color || '#ffffff'
    };
  };

  const linkBaseStyle = (link: Link): React.CSSProperties => ({
    backgroundColor: appearance.linkStyle.background,
    color: appearance.linkStyle.textColor,
    opacity: link.active ? 1 : 0.5,
  });
  
  const getAnimationProps = (): { className?: string; style?: React.CSSProperties } => {
    const anim = appearance.animation;

    if (!anim || anim === 'none') {
        return {};
    }

    if (typeof anim === 'string') {
        return { className: anim };
    }

    if (typeof anim === 'object') {
        return {
            style: {
                animationName: anim.type,
                animationDuration: `${anim.duration}s`,
                animationDelay: `${anim.delay}s`,
                animationIterationCount: anim.iterationCount,
                animationDirection: anim.direction,
                animationTimingFunction: anim.timingFunction,
                animationFillMode: 'both',
            },
        };
    }
    return {};
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-gray-900 dark:bg-black rounded-3xl p-2 shadow-2xl">
      <div className="bg-gray-800 dark:bg-gray-900 rounded-2xl p-1">
        <div className="w-full h-4 bg-gray-900 dark:bg-black rounded-t-xl flex justify-center items-center">
            <div className="w-16 h-1.5 bg-gray-700 dark:bg-gray-800 rounded-full"></div>
        </div>
        <div 
          style={backgroundStyle()}
          className={`w-full h-[550px] overflow-y-auto rounded-b-xl transition-all duration-300 ${appearance.font}`}
        >
          <div className="p-6 flex flex-col items-center text-center">
            <img 
              src={profile.avatarUrl} 
              alt="Profile" 
              className="w-24 h-24 rounded-full object-cover mb-4 shadow-lg border-2 border-white/50"
            />
            <h2 className="text-xl font-bold" style={{ color: appearance.textColor }}>
              {profile.name}
            </h2>
            <p className="text-sm mt-1" style={{ color: appearance.textColor }}>
              {profile.bio}
            </p>

            <div className={`w-full mt-8 ${
              appearance.layout === 'grid' 
              ? 'grid grid-cols-4 gap-x-4 gap-y-6' 
              : 'space-y-4'
            }`}>
              {links.filter(l => l.active).map(link => {
                const animationProps = getAnimationProps();
                const linkStyle = { ...linkBaseStyle(link), ...animationProps.style };
                const linkClasses = `transition-transform duration-200 hover:scale-105 active:scale-95 ${appearance.linkStyle.borderRadius} ${appearance.linkStyle.shadow} ${animationProps.className || ''}`;

                if (appearance.layout === 'grid') {
                  return (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={linkStyle}
                      className={`flex flex-col items-center justify-center gap-1 p-1 text-center font-medium text-xs aspect-square ${linkClasses}`}
                      title={link.title}
                    >
                      {React.cloneElement(getLinkIcon(link), { className: 'w-8 h-8' })}
                      <span className="break-words leading-tight max-w-full">{link.title}</span>
                    </a>
                  )
                }
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={linkStyle}
                    className={`relative flex items-center justify-center w-full p-4 font-semibold ${linkClasses}`}
                  >
                    <div className="absolute left-4">
                      {React.cloneElement(getLinkIcon(link), { className: 'w-5 h-5' })}
                    </div>
                    <span className="break-words leading-tight text-center">{link.title}</span>
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};