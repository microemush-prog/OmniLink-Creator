
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
}

export interface Theme {
  name: string;
  appearance: Appearance;
}