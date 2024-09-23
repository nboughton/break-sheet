<template>
  <q-expansion-item
    :label="title"
    :header-inset-level="0"
    default-opened
    expand-icon-class="text-white"
    :caption-lines="adversary ? undefined : 3"
    :caption="caption"
  >
    <slot name="content"></slot>
  </q-expansion-item>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  caption?: string;
  adversary?: boolean;
}>();
</script>

<style>
.q-item__label--caption {
  white-space: pre-wrap;
}
</style>
