import { defineStore } from 'pinia';
import { AppStore, Character } from 'src/components/models';

export const useBreakStore = defineStore('break-sheet', {
  state: () =>
    <AppStore>{
      conf: {
        char: 0,
      },
      characters: [],
    },
  getters: {
    char: (state): Character => state.characters[state.conf.char],
  },
  actions: {},
  persist: true,
});
