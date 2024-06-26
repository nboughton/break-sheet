<template>
  <div class="row">
    <q-input class="col-grow" label="Text" v-model="model.name" dense />
    <q-input class="col-3" label="+/-" type="number" v-model.number="model.value" dense />
    <q-btn class="col-shrink" icon="mdi-delete" flat dense rounded @click="emit('delete')" />
  </div>
</template>

<script setup lang="ts">
import { Mod } from 'src/components/models';

const model = defineModel<Mod>({ required: true });

const emit = defineEmits(['delete']);
</script>
