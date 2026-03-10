import { defineStore } from 'pinia';
import { AppStore, Character } from 'src/components/models';
import { exportFile } from 'quasar';
import { convertToQuestline } from 'src/lib/questline-converter';

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
        JSON.stringify(<AppStore>{
          characters: this.characters,
          conf: this.conf,
        })
      );
    },

    exportQuestline() {
      const now = new Date();
      const pad = (n: number) => String(n).padStart(2, '0');
      const dateStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
      exportFile(
        `BreakCharacters-QuestlineVTT-${dateStr}.characters`,
        convertToQuestline(this.characters)
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
