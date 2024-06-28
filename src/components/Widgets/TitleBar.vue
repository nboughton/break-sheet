<template>
  <div class="row section-title-bar text-white text-bold text-h5 rounded-borders q-pa-sm text-uppercase q-mb-sm">
    {{ title }}
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<style scoped>
.section-title-bar {
  background: linear-gradient(to right, rgba(250, 166, 54, 1) 0%, rgba(238, 49, 130, 1) 100%);
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
}
</style>
