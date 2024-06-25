<template>
  <div class="column q-px-xs">
    <title-bar title="identity" />
    <q-input class="row" v-model="app.char.identity.name" label="Name" dense />
    <div class="row">
      <q-input class="col" v-model="app.char.identity.calling" label="Calling" dense />
      <q-input class="col-4" type="number" v-model.number="app.char.identity.rank" label="Rank" dense />
    </div>
    <div class="row">
      <q-input class="col" v-model="app.char.identity.species" label="Species" dense />
      <q-select
        class="col-4"
        v-model="app.char.identity.size"
        :options="['Small', 'Medium', 'Large']"
        label="Size"
        dense
      />
    </div>
    <q-input class="row" v-model="app.char.identity.homeland" label="Homeland" dense />
    <q-input class="row" v-model="app.char.identity.languages" label="Languages" dense />
    <q-input class="row" v-model="app.char.identity.history" label="History" dense />
    <q-input class="row" v-model="app.char.identity.purviews" label="Purviews" autogrow dense />
    <q-input class="row" v-model="app.char.identity.description" label="Description" autogrow dense />
  </div>
</template>

<script setup lang="ts">
import { useBreakStore } from 'src/stores/break-store';

import TitleBar from './Widgets/TitleBar.vue';

const app = useBreakStore();
</script>
