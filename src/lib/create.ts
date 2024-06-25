import { uid } from 'quasar';
import { Character } from 'src/components/models';

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
        mods: 0,
        traits: '',
      },
      {
        name: 'Deftness',
        subtitle: 'Dodge, sneak, leap',
        base: 0,
        mods: 0,
        traits: '',
      },
      {
        name: 'Grit',
        subtitle: 'Cling, persist, press on',
        base: 0,
        mods: 0,
        traits: '',
      },
      {
        name: 'Insight',
        subtitle: 'Notice, know, remember',
        base: 0,
        mods: 0,
        traits: '',
      },
      {
        name: 'Aura',
        subtitle: 'Persuade, inspire, terrify',
        base: 0,
        mods: 0,
        traits: '',
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
      mods: 0,
      injuries: '',
    },
    defense: {
      name: 'Defense',
      subtitle: 'Match or best this to harm me',
      base: 0,
      mods: 0,
      notes: '',
    },
    speed: {
      base: 'Average',
      mods: '',
    },
    quirk: '',
    gear: '',
    inventory: {
      base: 10,
      additional: 0,
      slots: [],
    },
    abilities: [],
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
};
