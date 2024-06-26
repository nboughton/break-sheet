<template>
  <div class="column">
    <title-bar title="Allegiance" />

    <div class="row justify-between">
      <div class="column col-xs-6 col-sm-4 justify-around">
        <div class="row items-center">
          <q-input
            class="col-xs-4 col-sm-3 q-mr-sm"
            type="number"
            v-model.number="app.char.allegiance.dark"
            :min="0"
            outlined
            rounded
            input-class="text-h6 text-center"
          />
          <div class="col text-subtitle2">DARK ALLEGIANCE POINTS</div>
        </div>

        <div class="row items-center">
          <q-input
            class="col-xs-4 col-sm-3 q-mr-sm"
            type="number"
            v-model.number="app.char.allegiance.bright"
            :min="0"
            outlined
            rounded
            input-class="text-h6 text-center"
          />
          <div class="col text-subtitle2">BRIGHT ALLEGIANCE POINTS</div>
        </div>
      </div>

      <!--q-separator vertical color="black" /-->

      <div class="col-xs-6 col-sm-3 q-px-sm">
        <q-option-group :model-value="allegiance" :options="options" />
      </div>

      <!--q-separator vertical color="black" /-->

      <div class="col-xs-12 col-sm-4 q-px-sm">
        <q-input v-model="app.char.allegiance.gifts" label="GIFTS" autogrow dense />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useBreakStore } from 'src/stores/break-store';

import TitleBar from 'src/components/Widgets/TitleBar.vue';

const app = useBreakStore();

const options = [
  { label: 'Unaligned', value: 'Unaligned' },
  { label: 'Dark', value: 'Dark' },
  { label: 'Twilight', value: 'Twilight' },
  { label: 'Bright', value: 'Bright' },
];

const allegiance = computed((): string => {
  const dark = app.char.allegiance.dark;
  const bright = app.char.allegiance.bright;

  return dark + bright < 2 ? 'Unaligned' : dark - bright >= 2 ? 'Dark' : bright - dark >= 2 ? 'Bright' : 'Twilight';
});
</script>
