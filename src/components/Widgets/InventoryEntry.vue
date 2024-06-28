<template>
  <div class="row items-center">
    <q-input class="col" label="ITEM" v-model="item.name" />
    <q-input class="col-2" type="number" label="SLOTS" v-model.number="item.slots" />
    <q-btn class="col-shrink" icon="mdi-delete" flat dense rounded @click="emit('delete')" />
  </div>
</template>

<script setup lang="ts">
import { InventoryItem } from '../models';

const item = defineModel<InventoryItem>({ required: true });
const emit = defineEmits(['delete']);
</script>
