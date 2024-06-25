<template>
  <div class="row bg-grey text-white text-h5 rounded-corners q-pa-xs text-uppercase q-mb-sm">{{ title }}</div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>
