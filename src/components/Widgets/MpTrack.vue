<template>
  <div class="row items-center q-my-xs">
    <div class="col" v-for="(h, i) in mp" :key="i">
      <q-icon :name="`mdi-star-four-points${h ? '' : '-outline'}`" size="sm" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  mp: boolean[];
}>();
</script>
