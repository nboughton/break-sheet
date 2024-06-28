<template>
  <div class="column">
    <div class="row items-center">
      <div class="col-shrink text-subtitle2">{{ title ? title : 'Bonuses/Penalties' }}</div>
      <q-separator class="col" />
      <q-btn class="col-shrink" icon="mdi-plus-circle" dense flat rounded @click="model.push(create.mod())" />
    </div>

    <mod-entry v-for="(m, i) in model" :key="i" v-model="model[i]" @delete="deleteMod(i)" />
  </div>
</template>

<script setup lang="ts">
import { Mod } from 'src/components/models';

import { useQuasar } from 'quasar';

import { create } from 'src/lib/create';

import ModEntry from 'src/components/Widgets/ModEntry.vue';

const model = defineModel<Mod[]>({ required: true });

defineProps<{
  title?: string;
}>();

const $q = useQuasar();
const deleteMod = (i: number) =>
  $q
    .dialog({
      title: 'Delete this bonus/penalty?',
      cancel: true,
    })
    .onOk(() => model.value.splice(i, 1));
</script>
