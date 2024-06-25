export interface AppStore {
  conf: {
    char: number;
  };
  characters: Character[];
}

export interface SectionHeader {
  name: string;
  subtitle: string;
  base: number | string;
}
export interface Character {
  id: string;
  identity: {
    name: string;
    calling: string;
    rank: number;
    species: string;
    size: 'Small' | 'Medium' | 'Large';
    homeland: string;
    languages: string;
    history: string;
    purviews: string;
    description: string;
  };
  aptitudes: Aptitude[];
  attacks: Attacks;
  hearts: Hearts;
  defense: Defense;
  speed: Speed;
  quirk: string;
  gear: string;
  inventory: Inventory;
  abilities: string[];
  bonds: string;
  allegiance: Allegiance;
  wealth: Wealth;
  xp: XP;
}

export interface Aptitude extends SectionHeader {
  traits: string;
  mods: number; // bonuses/penalties
}

export interface Attacks extends SectionHeader {
  weapons: Weapon[];
}

export interface Weapon {
  name: string;
  bonuses: number;
  extra: number;
}

export interface Hearts extends SectionHeader {
  mods: number; // bonuses/penalties
  injuries: string;
}

export interface Defense extends SectionHeader {
  mods: number; // bonuses/penalties
  notes: string;
}

export type SpeedRating = 'Slow' | 'Average' | 'Fast' | 'Very Fast';

export interface Speed {
  base: SpeedRating;
  mods: string; // notes
}

export interface Inventory {
  base: number;
  additional: number;
  slots: string[];
}

export interface Wealth {
  stones: number;
  coins: number;
  gems: number;
}

export interface XP {
  current: number;
  toNext: number;
}

export interface Allegiance {
  dark: number;
  bright: number;
  gifts: string;
}
