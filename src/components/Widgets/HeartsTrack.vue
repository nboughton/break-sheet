<template>
  <div class="row items-center q-my-xs">
    <div class="col" v-for="(h, i) in hearts" :key="i">
      <q-icon :name="`mdi-heart${h ? '' : '-outline'}`" size="md" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  hearts: boolean[];
}>();
</script>
