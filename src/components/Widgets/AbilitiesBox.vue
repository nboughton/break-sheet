<template>
  <div class="column q-mb-sm">
    <title-bar title="ABILITIES">
      <template v-slot:button>
        <q-btn
          class="col-shrink"
          icon="mdi-plus-circle"
          flat
          dense
          rounded
          @click="app.char.abl.push(create.ability())"
        />
      </template>
    </title-bar>

    <collapsible-section
      header-class="ability-title-bar text-white text-bold  q-mb-sm"
      :default-opened="a.name == 'New Ability'"
      :title="a.name"
      v-for="(a, i) in app.char.abl"
      :key="i"
      :caption="a.text"
      :adversary="adversary"
    >
      <template v-slot:content>
        <div class="column">
          <div class="row">
            <q-input class="col" label="NAME" v-model="app.char.abl[i].name" />
            <q-select class="col" label="SOURCE" v-model="app.char.abl[i].type" :options="['Calling', 'Species']" />
            <q-select
              class="col"
              label="ALLEGIANCE"
              v-model="app.char.abl[i].allegiance"
              :options="['None', 'Bright', 'Dark']"
            />
            <q-btn class="col-shrink" icon="mdi-delete" flat rounded dense @click="deleteAbility(i)" />
          </div>

          <q-input class="row q-mb-sm" label="TEXT" v-model="app.char.abl[i].text" autogrow />
        </div>
      </template>
    </collapsible-section>

    <q-input class="row" v-model="app.char.abilities" autogrow outlined label="notes" />
  </div>
</template>

<script setup lang="ts">
import { useBreakStore } from 'src/stores/break-store';
import { useQuasar } from 'quasar';

import { create } from 'src/lib/create';

import TitleBar from './TitleBar.vue';
import CollapsibleSection from './CollapsibleSection.vue';

defineProps<{
  adversary?: boolean;
}>();

const app = useBreakStore();

const $q = useQuasar();
const deleteAbility = (i: number) =>
  $q
    .dialog({
      title: 'Delete this ability?',
      cancel: true,
    })
    .onOk(() => app.char.abl.splice(i, 1));
</script>

<style>
.ability-title-bar {
  font-weight: bold;
  color: aliceblue;
  background: linear-gradient(to right, rgba(170, 61, 158, 1) 0%, rgba(0, 127, 196, 1) 100%);
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.ability-title-bar .q-item__label--caption {
  color: white;
}
</style>
