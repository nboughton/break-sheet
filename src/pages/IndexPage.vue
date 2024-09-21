<template>
  <q-page class="column bg-white">
    <stats-compact v-if="app.conf.tab != 'adversary'" />
    <q-tab-panels v-model="app.conf.tab" swipeable animated>
      <q-tab-panel v-if="app.char.adversary" class="column" name="adversary">
        <div class="q-pa-md" ref="adversary">
          <q-input class="row" label="Name" v-model="app.char.identity.name" readonly borderless />
          <q-input
            class="row"
            label="Description"
            v-model="app.char.identity.description"
            autogrow
            readonly
            borderless
          />

          <q-separator class="row q-my-sm" />

          <stats-compact v-if="app.conf.tab == 'adversary'" />

          <q-separator class="row q-my-sm" />

          <div class="row text-h6"><span class="col"> Attacks</span></div>
          <div class="row" v-for="(a, i) in app.char.attacks.weapons" :key="`wpn-${i}`">
            <q-input class="col-6" label="Name" :model-value="a.name" readonly dense borderless />
            <q-input class="col" label="Range" :model-value="a.range" readonly dense borderless />
            <q-input
              class="col"
              label="Atk"
              :model-value="`+${a.bonuses + +app.char.attacks.base}`"
              readonly
              dense
              borderless
            />
            <q-input class="col" label="Extra Dmg." :model-value="a.extra" readonly dense borderless />
            <q-input
              class="col-12"
              label="Description"
              :model-value="a.description"
              readonly
              dense
              autogrow
              borderless
            />
          </div>

          <q-separator class="row q-my-sm" />

          <div class="row text-h6"><span class="col">Abilities</span></div>
          <q-input
            class="row"
            v-for="(a, i) in app.char.abl"
            :key="`abl-${i}`"
            :label="a.name"
            :model-value="a.text"
            borderless
            dense
            autogrow
          />
        </div>
      </q-tab-panel>

      <q-tab-panel class="row justify-evenly" name="who">
        <div :class="`col-xs-12 col-sm-6 ${$q.screen.gt.xs ? 'q-pr-xs' : ''}`">
          <identity-pane />
          <quirk-box />
          <xp-box />
        </div>
        <div :class="`col-xs-12 col-sm-6 ${$q.screen.gt.xs ? 'q-pl-xs' : ''}`">
          <abilities-box />
          <bonds-box />
          <allegiance-box />
        </div>
      </q-tab-panel>

      <q-tab-panel class="row justify-evenly" name="aptitudes">
        <aptitudes-pane />
      </q-tab-panel>

      <q-tab-panel class="row justify-evenly" name="fight">
        <combat-pane />
      </q-tab-panel>

      <q-tab-panel class="row column justify-evenly" name="gear">
        <gear-box />
        <wealth-box />
      </q-tab-panel>
    </q-tab-panels>
    <div class="row" v-if="app.conf.tab == 'adversary'">
      <q-btn class="col" label="Export to png" @click="render" flat />
      <q-btn class="col" label="Export to JSON" @click="jsonExport" flat />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { useBreakStore } from 'src/stores/break-store';
import { exportFile } from 'quasar';

import { modTotal } from 'src/lib/util';
import { toBlob } from 'html-to-image';

import IdentityPane from 'src/components/IdentityPane.vue';
import AptitudesPane from 'src/components/AptitudesPane.vue';
import CombatPane from 'src/components/CombatPane.vue';

import AllegianceBox from 'src/components/Widgets/AllegianceBox.vue';
import WealthBox from 'src/components/Widgets/WealthBox.vue';
import XpBox from 'src/components/Widgets/XpBox.vue';
import GearBox from 'src/components/Widgets/GearBox.vue';
import QuirkBox from 'src/components/Widgets/QuirkBox.vue';
import AbilitiesBox from 'src/components/Widgets/AbilitiesBox.vue';
import BondsBox from 'src/components/Widgets/BondsBox.vue';
import StatsCompact from 'src/components/Widgets/StatsCompact.vue';

const app = useBreakStore();

const adversary = ref<HTMLElement | null>(null);

onMounted(() => {
  adversary.value;
});

const render = () =>
  toBlob(adversary.value as HTMLElement)
    .then((blob) => exportFile('Adversary-card.png', blob as Blob))
    .catch((err) => console.error(err));

const jsonExport = () => {
  const d = {
    name: app.char.identity.name,
    description: app.char.identity.description,
    aptitudes: app.char.aptitudes.map((a) => ({ name: a.name, value: +a.base + a.trait + modTotal(a.mods) })),
    attack: app.char.attacks.base,
    weapons: app.char.attacks.weapons,
    defense: +app.char.defense.base + modTotal(app.char.defense.mods),
    hearts: +app.char.hearts.base + modTotal(app.char.hearts.mods),
    speed: app.char.speed.base,
    abilities: app.char.abl.map((a) => ({ name: a.name, text: a.text })),
  };

  exportFile('Adversary.json', JSON.stringify(d));
};
</script>
