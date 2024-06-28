<template>
  <div class="row items-center justify-center icon-box no-wrap">
    <q-icon class="col-shrink" :name="icon" />
    <span class="col-shrink">{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon: string;
  text: string | number;
}>();
</script>

<style scoped>
.icon-box {
  font-size: 1.5em;
  font-weight: bold;
}
</style>
