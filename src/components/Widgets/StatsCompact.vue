<template>
  <div class="row items-center justify-between q-mt-sm q-px-md">
    <div class="col-shrink" v-if="$q.screen.gt.xs && !adversary">
      <icon-box icon="mdi-sword" :text="`+${app.char.attacks.base}`" />
    </div>

    <div class="col-shrink" v-if="$q.screen.gt.xs && !adversary">
      <icon-box icon="mdi-shield" :text="+app.char.defense.base + modTotal(app.char.defense.mods)" />
    </div>

    <div v-for="(a, i) in app.char.aptitudes" :key="i" class="col-shrink">
      <stat-box :name="a.name" :value="+a.base + a.trait + modTotal(a.mods)" />
    </div>

    <div class="col-shrink" v-if="$q.screen.gt.xs && !adversary">
      <icon-box icon="mdi-heart" color="red" :text="+app.char.hearts.base + modTotal(app.char.hearts.mods)" />
    </div>

    <div class="col-shrink" v-if="$q.screen.gt.xs && !adversary">
      <icon-box icon="mdi-run" :text="app.char.speed.selected" />
    </div>
  </div>

  <div class="row justify-between q-px-md q-mt-sm" v-if="$q.screen.lt.sm || adversary">
    <div class="col-shrink"><icon-box icon="mdi-sword" :text="app.char.attacks.base" /></div>

    <div class="col-shrink">
      <icon-box icon="mdi-shield" :text="+app.char.defense.base + modTotal(app.char.defense.mods)" />
    </div>

    <div class="col-shrink">
      <icon-box icon="mdi-heart" color="red" :text="+app.char.hearts.base + modTotal(app.char.hearts.mods)" />
    </div>

    <div class="col-shrink"><icon-box icon="mdi-run" :text="app.char.speed.selected" /></div>
  </div>
</template>

<script setup lang="ts">
import { useBreakStore } from 'src/stores/break-store';

import { modTotal } from 'src/lib/util';

import StatBox from './StatBox.vue';
import IconBox from './IconBox.vue';

const app = useBreakStore();

defineProps<{
  adversary?: boolean;
}>();
</script>
