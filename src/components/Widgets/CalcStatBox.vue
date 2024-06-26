<template>
  <div class="stat-box">
    <div class="stat-value text-h4 text-center">{{ value }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  value: number;
}>();
</script>

<style scoped>
.stat-box {
  border-radius: 50%;
  border: 3px solid black;
  width: 75px;
  height: 75px;
}

.stat-value {
  margin: auto;
  padding-top: 20%;
}
</style>
