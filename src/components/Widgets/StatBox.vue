<template>
  <div class="column">
    <div class="row text-bold text-center">
      <span class="col"> {{ name }}</span>
    </div>
    <div class="row text-bold text-center">
      <span class="col">{{ value }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string;
  value: number;
}>();
</script>
