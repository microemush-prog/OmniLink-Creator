export interface Link {
  id: string;
  title: string;
  url: string;
  active: boolean;
}

export interface Profile {
  avatarUrl: string;
  name: string;
  bio: string;
}

export interface CustomAnimation {
  type: 'subtle-pulse' | 'shake' | 'bounce-light' | 'tada' | 'fadeIn' | 'slideInUp';
  duration: number; // in seconds
  delay: number; // in seconds
  iterationCount: 'infinite' | number;
  direction: 'normal' | 'reverse' | 'alternate';
  timingFunction: 'ease' | 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
}

export interface Appearance {
  font: string;
  background: {
    type: 'color' | 'gradient';
    color?: string;
    gradient?: {
      angle: number;
      start: string;
      end:string;
    };
  };
  linkStyle: {
    background: string;
    textColor: string;
    shadow: string;
    borderRadius: string;
  };
  textColor: string;
  layout?: 'list' | 'grid';
  animation?: string | CustomAnimation;
}

export interface Theme {
  name: string;
  appearance: Appearance;
}