<template>
  <div class="column">
    <title-bar title="Combat Values" />
    <div class="row justify-evenly">
      <div class="col-xs-12 col-sm-5 q-pa-sm">
        <attack-box />
      </div>

      <q-separator v-if="$q.screen.gt.xs" vertical color="black" />

      <div class="col-xs-12 col-sm-5 q-pa-sm">
        <q-separator v-if="$q.screen.lt.sm" color="black" />
        <hearts-box />
      </div>

      <div class="col-xs-12 col-sm-5 q-pa-sm">
        <q-separator color="black" />
        <defense-box />
      </div>

      <q-separator v-if="$q.screen.gt.xs" vertical color="black" />

      <div class="col-xs-12 col-sm-5 q-pa-sm">
        <q-separator color="black" />
        <speed-box />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TitleBar from './Widgets/TitleBar.vue';
import DefenseBox from 'src/components/Widgets/DefenseBox.vue';
import HeartsBox from 'src/components/Widgets/HeartsBox.vue';
import AttackBox from 'src/components/Widgets/AttackBox.vue';
import SpeedBox from 'src/components/Widgets/SpeedBox.vue';
</script>
