<template>
  <div class="column q-mb-sm">
    <title-bar title="IDENTITY" />

    <q-input class="row" v-model="app.char.identity.name" label="NAME" />
    <div class="row">
      <q-input class="col" v-model="app.char.identity.calling" label="CALLING" />
      <q-input class="col-4" type="number" v-model.number="app.char.identity.rank" label="RANK" />
    </div>
    <div class="row">
      <q-input class="col" v-model="app.char.identity.species" label="SPECIES" />
      <q-select class="col-4" v-model="app.char.identity.size" :options="['Small', 'Medium', 'Large']" label="SIZE" />
    </div>
    <q-input class="row" v-model="app.char.identity.homeland" label="HOMELAND" autogrow />
    <q-input class="row" v-model="app.char.identity.languages" label="LANGUAGES" autogrow />
    <q-input class="row" v-model="app.char.identity.history" label="HISTORY" autogrow />
    <q-input class="row" v-model="app.char.identity.purviews" label="PURVIEWS" autogrow />
    <q-input class="row" v-model="app.char.identity.description" label="DESCRIPTION" autogrow />
  </div>
</template>

<script setup lang="ts">
import { useBreakStore } from 'src/stores/break-store';

import TitleBar from './Widgets/TitleBar.vue';

const app = useBreakStore();
</script>
