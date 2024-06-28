import { defineStore } from 'pinia';
import { AppStore, Character } from 'src/components/models';
import { exportFile } from 'quasar';

export const useBreakStore = defineStore('break-sheet', {
  state: () =>
    <AppStore>{
      conf: {
        char: 0,
        tab: 'who',
      },
      characters: [],
    },
  getters: {
    char: (state): Character => state.characters[state.conf.char],
  },

  actions: {
    exportData() {
      const now = new Date();
      exportFile(
        `BreakCharacters-${now.getFullYear()}-${now.getMonth()}-${now.getDate()}.json`,
        JSON.stringify({
          chars: this.characters,
          conf: this.conf,
        })
      );
    },

    loadData(d: AppStore) {
      this.conf = d.conf;
      d.characters.forEach((lChar) => {
        let overwrite = false;
        this.characters.forEach((sChar, idx) => {
          if (sChar.id == lChar.id) {
            this.characters[idx] = lChar;
            overwrite = true;
            return;
          }
        });
        if (!overwrite) this.characters.push(lChar);
      });
    },
  },

  persist: true,
});
