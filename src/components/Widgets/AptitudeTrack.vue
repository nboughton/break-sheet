<template>
  <div class="row items-center q-my-xs no-wrap">
    <div class="col-grow" v-for="(b, i) in boxes" :key="i">
      <div class="row items-center no-wrap">
        <div class="col sep" v-if="i > 0 && i % 5 == 0"></div>
        <div :class="`col box ${b ? 'filled' : ''}`"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  boxes: boolean[];
}>();
</script>

<style scoped>
.box {
  min-width: 15px;
  height: 15px;
  border: 1px solid black;
  background-color: white;
}

.filled {
  background-color: black;
}

.sep {
  height: 2em;
  max-width: 2px;
  margin-left: 2px;
  margin-right: 2px;
  background-color: black;
}
</style>
