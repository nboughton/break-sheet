<template>
  <q-page class="column">
    <q-tab-panels v-model="app.conf.tab" swipeable animated>
      <q-tab-panel class="row justify-evenly" name="who">
        <div :class="`col-xs-12 col-sm-6 ${$q.screen.gt.xs ? 'q-pr-xs' : ''}`">
          <identity-pane />
          <abilities-box />
          <xp-box />
        </div>
        <div :class="`col-xs-12 col-sm-6 ${$q.screen.gt.xs ? 'q-pl-xs' : ''}`">
          <aptitudes-pane />
        </div>
      </q-tab-panel>

      <q-tab-panel class="row justify-evenly" name="fight">
        <combat-pane />
      </q-tab-panel>

      <q-tab-panel class="row justify-evenly" name="gear">
        <div :class="`col-xs-12 col-sm-6 ${$q.screen.gt.xs ? 'q-pr-xs' : ''}`">
          <gear-box />
          <wealth-box />
        </div>

        <div :class="`col-xs-12 col-sm-6 ${$q.screen.gt.xs ? 'q-pl-xs' : ''}`">
          <quirk-box />
          <bonds-box />
          <allegiance-box />
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup lang="ts">
import { useBreakStore } from 'src/stores/break-store';

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

const app = useBreakStore();
</script>
