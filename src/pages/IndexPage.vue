<template>
  <q-page class="column">
    <q-tabs v-model="tab" dense>
      <q-tab name="identity" label="Identity & Aptitudes" />
      <q-tab name="combat" label="Combat" />
      <q-tab name="test" label="Testing" />
    </q-tabs>

    <q-tab-panels v-model="tab">
      <q-tab-panel class="row justify-evenly" name="identity">
        <div class="col-xs-12 col-sm-6">
          <identity-pane />
        </div>
        <div class="col-xs-12 col-sm-6">
          <aptitudes-pane />
        </div>
      </q-tab-panel>

      <q-tab-panel name="combat">
        <combat-pane />
      </q-tab-panel>

      <q-tab-panel class="row justify-evenly" name="test">
        <div :class="`col-xs-12 col-sm-6 ${$q.screen.gt.xs ? 'q-pr-xs' : ''}`">
          <quirk-box />
          <abilities-box />
          <bonds-box />
          <allegiance-box />
        </div>

        <div :class="`col-xs-12 col-sm-6 ${$q.screen.gt.xs ? 'q-pl-xs' : ''}`">
          <gear-box />
          <wealth-box />
          <xp-box />
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

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

const tab = ref('identity');
</script>
