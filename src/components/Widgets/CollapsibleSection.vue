<template>
  <q-expansion-item
    :label="title"
    :header-inset-level="0"
    header-class="bg-grey text-h5 text-white rounded-corners"
    default-opened
    expand-icon-class="text-white"
  >
    <slot name="content"></slot>
  </q-expansion-item>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>
