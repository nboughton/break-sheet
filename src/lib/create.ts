import { uid } from 'quasar';
import { Character, Mod, Weapon } from 'src/components/models';

export const create = {
  character: (): Character => ({
    id: uid(),
    identity: {
      name: 'New Character',
      calling: '',
      rank: 1,
      species: '',
      size: 'Medium',
      languages: 'Low Speech',
      homeland: '',
      history: '',
      purviews: '',
      description: '',
    },
    aptitudes: [
      {
        name: 'Might',
        subtitle: 'Smash, crush, lift',
        base: 0,
        mods: [],
        trait: 0,
      },
      {
        name: 'Deftness',
        subtitle: 'Dodge, sneak, leap',
        base: 0,
        mods: [],
        trait: 0,
      },
      {
        name: 'Grit',
        subtitle: 'Cling, persist, press on',
        base: 0,
        mods: [],
        trait: 0,
      },
      {
        name: 'Insight',
        subtitle: 'Notice, know, remember',
        base: 0,
        mods: [],
        trait: 0,
      },
      {
        name: 'Aura',
        subtitle: 'Persuade, inspire, terrify',
        base: 0,
        mods: [],
        trait: 0,
      },
    ],
    attacks: {
      name: 'Attack Bonus',
      subtitle: 'Add to my attacks rolls',
      base: 0,
      weapons: [],
    },
    hearts: {
      name: 'Hearts',
      subtitle: 'Protecting me from injury',
      base: 0,
      mods: [],
      injuries: '',
    },
    defense: {
      name: 'Defense',
      subtitle: 'Match or best this to harm me',
      base: 0,
      mods: [],
      notes: '',
    },
    speed: {
      name: 'Speed Rating',
      subtitle: 'Sets areas I can move through',
      base: 'Average',
      mods: '',
      selected: 'Average',
    },
    quirk: '',
    inventory: {
      name: 'Inventory Slots',
      subtitle: '',
      base: 10,
      worn: '',
      mods: [],
      slots: [],
    },
    abilities: '',
    bonds: '',
    allegiance: {
      dark: 0,
      bright: 0,
      gifts: '',
    },
    wealth: {
      stones: 0,
      coins: 0,
      gems: 0,
    },
    xp: {
      current: 0,
      toNext: 0,
    },
  }),

  mod: (): Mod => ({
    name: '',
    value: 0,
  }),

  weapon: (): Weapon => ({
    name: '',
    bonuses: 0,
    extra: 0,
  }),
};
