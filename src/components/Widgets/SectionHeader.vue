<template>
  <div class="row justify-between">
    <div class="col" v-if="icon != undefined">
      <q-icon :name="icon" />
    </div>
    <div class="col-grow">
      <div class="row text-h5">{{ model.name }}</div>
      <div class="row text-subtitle2">{{ model.subtitle }}</div>
    </div>

    <div class="col-4">
      <q-input
        input-class="row items-center text-h5 text-center"
        type="number"
        v-model.number="model.base"
        dense
        outlined
        rounded
      >
        <template v-slot:before
          ><span class="text-h6"><strong>BASE</strong></span></template
        >
      </q-input>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SectionHeader } from 'src/components/models';

const model = defineModel<SectionHeader>({ required: true });

defineProps<{
  icon?: string;
}>();
</script>
