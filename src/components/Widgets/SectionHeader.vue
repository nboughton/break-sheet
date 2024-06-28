<template>
  <div class="row items-center justify-between q-mb-xs">
    <div class="col-shrink q-mr-sm" v-if="icon != undefined">
      <q-icon :name="icon" size="md" />
    </div>
    <div class="col-grow">
      <div class="row text-h6">{{ model.name }}</div>
      <div class="row text-subtitle2">{{ model.subtitle }}</div>
    </div>

    <div class="col-4" v-if="baseType == 'number'">
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
    <div class="col-4" v-else>
      <div class="row"><span class="col text-right text-bold">BASE</span></div>
      <q-input class="row" v-model="model.base" input-class="text-right" borderless dense />
    </div>
  </div>
</template>

<script setup lang="ts">
import { SectionHeader } from 'src/components/models';

const model = defineModel<SectionHeader>({ required: true });

defineProps<{
  icon?: string;
  baseType: 'string' | 'number';
}>();
</script>
