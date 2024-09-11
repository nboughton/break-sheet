export interface AppStore {
  conf: {
    char: number;
    tab: string;
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
  inventory: Inventory;
  abilities: string;
  abl: Ability[];
  bonds: string;
  allegiance: Allegiance;
  wealth: Wealth;
  xp: XP;
}

export interface Ability {
  name: string;
  type: 'Species' | 'Calling';
  allegiance: 'Bright' | 'Dark' | 'None';
  text: string;
}

export interface Mod {
  name: string;
  value: number;
}

export interface Aptitude extends SectionHeader {
  trait: number;
  mods: Mod[]; // bonuses/penalties
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
  mods: Mod[]; // bonuses/penalties
  injuries: string;
}

export interface Defense extends SectionHeader {
  mods: Mod[]; // bonuses/penalties
  notes: string;
}

export interface Speed extends SectionHeader {
  mods: string; // notes
  selected: string;
}

export interface Inventory extends SectionHeader {
  worn: string;
  mods: Mod[];
  slots: InventoryItem[];
}

export interface InventoryItem {
  name: string;
  slots: number;
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
