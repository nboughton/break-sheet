<template>
  <div class="row items-center">
    <q-input class="col" :label="label" v-model="item.text" autogrow />
  </div>
</template>

<script setup lang="ts">
import { AccessoryItem } from '../models';

defineProps<{
  label: string;
}>();

const item = defineModel<AccessoryItem>({ required: true });
</script>
