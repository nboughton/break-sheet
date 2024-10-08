<template>
  <q-page class="column bg-white">
    <stats-compact v-if="app.conf.tab != 'adversary'" />
    <q-tab-panels v-model="app.conf.tab" swipeable animated>
      <q-tab-panel v-if="app.char.adversary" class="column items-center" name="adversary">
        <div class="q-pa-md" ref="adversary" style="max-width: 400px">
          <q-input class="row" input-class="text-h5" v-model="app.char.identity.name" readonly borderless />
          <q-input
            class="row"
            label="Description"
            v-model="app.char.identity.description"
            autogrow
            readonly
            borderless
          />

          <q-separator class="row q-my-sm" />

          <stats-compact adversary />

          <q-separator class="row q-my-sm" />

          <div class="row text-h6"><span class="col"> Attacks</span></div>
          <div
            class="row"
            v-for="(a, i) in app.char.attacks.weapons"
            :key="`wpn-${i}`"
            :style="i < app.char.attacks.weapons.length - 1 ? 'border-bottom: 1px solid lightgrey' : ''"
          >
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
            <div class="col-12" style="white-space: pre-wrap">{{ a.description }}</div>
            <q-separator v-if="i < app.char.attacks.weapons.length" class="row" />
          </div>

          <q-separator class="row q-my-sm" />

          <abilities-box adversary />
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
      <q-btn class="col" label="Export to png" @click="exportPNG" flat />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { useBreakStore } from 'src/stores/break-store';

import { exportFile } from 'quasar';
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

const exportPNG = () =>
  toBlob(adversary.value as HTMLElement, { backgroundColor: 'white' })
    .then((blob) => exportFile(`${app.char.identity.name}.png`, blob as Blob))
    .catch((err) => console.error(err));
</script>
