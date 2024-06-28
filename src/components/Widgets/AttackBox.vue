<template>
  <div class="column q-mb-sm">
    <section-header base-type="number" v-model="app.char.attacks" icon="mdi-sword" />
    <div class="row items-center">
      <div class="col-shrink text-subtitle2 text-h6">Weapons</div>
      <q-separator class="col-grow" />
      <q-btn
        class="col-shrink"
        icon="mdi-plus-circle"
        flat
        round
        dense
        @click="app.char.attacks.weapons.push(create.weapon())"
      />
    </div>
    <weapon-entry
      v-for="(w, i) in app.char.attacks.weapons"
      :key="i"
      v-model="app.char.attacks.weapons[i]"
      @delete="deleteWeapon(i)"
    />
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useBreakStore } from 'src/stores/break-store';

import { create } from 'src/lib/create';

import SectionHeader from './SectionHeader.vue';
import WeaponEntry from './WeaponEntry.vue';

const app = useBreakStore();

const $q = useQuasar();
const deleteWeapon = (i: number) =>
  $q
    .dialog({
      title: 'Delete this weapon?',
      cancel: true,
    })
    .onOk(() => app.char.attacks.weapons.splice(i, 1));
</script>
