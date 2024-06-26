<template>
  <q-page class="column" padding>
    <div class="row justify-evenly full-width">
      <div class="col-xs-12 col-sm-6">
        <!--LEFT COL-->
        <identity-pane />
      </div>

      <div class="col-xs-12 col-sm-6">
        <!--RIGHT COL-->
        <aptitudes-pane />
      </div>
    </div>

    <div class="row justify-evenly full-width">
      <div class="col-xs-12 col-sm-6">
        <combat-pane />
      </div>
      <div class="col-xs-12 col-sm-6"></div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import IdentityPane from 'src/components/IdentityPane.vue';
import AptitudesPane from 'src/components/AptitudesPane.vue';
import CombatPane from 'src/components/CombatPane.vue';
</script>
