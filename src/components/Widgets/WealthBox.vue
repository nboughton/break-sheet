<template>
  <div class="column">
    <title-bar title="Wealth" />

    <div class="row text-subtitle1">100 Stones = 1 Coin, 100 Coins = 1 Gem</div>

    <div class="row">
      <q-input class="col" v-model="app.char.wealth.stones" label="STONES" />
      <q-input class="col" v-model="app.char.wealth.coins" label="COINS" />
      <q-input class="col" v-model="app.char.wealth.gems" label="GEMS" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBreakStore } from 'src/stores/break-store';

import TitleBar from './TitleBar.vue';

const app = useBreakStore();
</script>
