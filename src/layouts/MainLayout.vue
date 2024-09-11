<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="row justify-between" style="background-color: #24aea6">
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-tabs v-model="app.conf.tab" shrink stretch>
          <q-tab name="who" :icon="showIcon('mdi-account-circle')" :label="showLabel('Identity')">
            <q-tooltip>Identity, Quirk, XP, Social, Allegiance</q-tooltip>
          </q-tab>
          <q-tab name="aptitudes" :icon="showIcon('mdi-adjust')" :label="showLabel('Aptitudes')">
            <q-tooltip>Aptitudes</q-tooltip>
          </q-tab>
          <q-tab name="fight" :icon="showIcon('mdi-sword-cross')" :label="showLabel('Combat')">
            <q-tooltip>Combat</q-tooltip>
          </q-tab>
          <q-tab name="gear" :icon="showIcon('mdi-bag-personal')" :label="showLabel('Gear')">
            <q-tooltip>Gear and Money</q-tooltip>
          </q-tab>
        </q-tabs>

        <div></div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" :show-if-above="false" bordered class="column justify-between">
      <q-list>
        <q-btn
          class="full-width"
          label="New Character"
          flat
          @click="app.characters.push(create.character())"
          icon-right="add"
        />
        <q-item
          class="items-center"
          v-for="(c, i) in app.characters"
          :key="`char-${i}`"
          :active="app.conf.char == i"
          active-class="text-accent"
          clickable
          v-ripple
        >
          <q-item-section @click="app.conf.char = i">{{ c.identity.name }}</q-item-section>
          <q-item-section v-if="app.characters.length > 1" side>
            <q-btn icon="delete" flat dense rounded @click="deleteCharacter(i)" />
          </q-item-section>
        </q-item>

        <q-separator />

        <q-item clickable v-ripple @click="app.exportData">
          <q-item-section avatar>
            <q-icon name="download" />
          </q-item-section>
          <q-item-section>
            Export Character Data
            <q-tooltip>Download your character data as a .json file</q-tooltip>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="showDataLoad = true">
          <q-item-section avatar>
            <q-icon name="upload" />
          </q-item-section>
          <q-item-section>
            Load Character Data
            <q-tooltip>Load previously exported character data</q-tooltip>
          </q-item-section>
        </q-item>

        <q-separator />

        <q-item clickable v-ripple @click="showAbout = true">
          <q-item-section avatar>
            <q-icon name="mdi-information" />
          </q-item-section>

          <q-item-section> About </q-item-section>
        </q-item>
      </q-list>

      <q-list class="self-end">
        <q-item>
          <q-item-section
            ><p class="text-justify">
              This is an independent product published under BREAK!! RPG's Non-Commercial License and is not affiliated
              with BREAK!!'s creators or publishers.
            </p></q-item-section
          >
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>

  <q-dialog v-model="showDataLoad" :maximized="$q.screen.lt.sm">
    <q-card>
      <q-card-section class="text-center text-h6 bg-grey text-white">Load Character Data</q-card-section>

      <q-card-section class="text-subtitle">
        Please bear in mind that this data will overwrite any existing versions of the same character.
      </q-card-section>

      <q-card-section>
        <q-file v-model="fileToLoad" standout label="Select File" accept=".json" />
      </q-card-section>

      <q-card-actions align="center">
        <q-btn label="load" color="primary" @click="loadData" flat />
        <q-btn label="close" color="warning" @click="showDataLoad = false" flat />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="showAbout" :maximized="$q.screen.lt.sm">
    <q-card>
      <q-card-section class="row text-center text-h6 bg-grey text-white items-center">
        <div class="col">About</div>
        <q-btn icon="mdi-close-circle" flat rounded dense @click="showAbout = false" />
      </q-card-section>

      <q-card-section>
        <p>BREAK!! TTRPG is copyright &copy; Reynaldo Madriñan &amp; Carlo Tartaglia 2023.</p>
        <p>
          This is an independent product published under BREAK!! RPG's Non-Commercial License and is not affiliated with
          BREAK!!'s creators or publishers.
        </p>
        <p>
          Please submit feature requests and bug reports to the
          <a href="https://github.com/nboughton/break-sheet" target="_blank">github project</a>
        </p>
        <p>
          If you like my work and want support it, you can <a href="https://ko-fi.com/tiberianpun">buy me a coffee</a>
        </p>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { useBreakStore } from 'src/stores/break-store';
import { useQuasar } from 'quasar';
import { create } from 'src/lib/create';
import { AppStore } from 'src/components/models';

const app = useBreakStore();

const $q = useQuasar();
const deleteCharacter = (i: number) =>
  $q
    .dialog({
      title: `Delete ${app.characters[i].identity.name}?`,
      cancel: true,
    })
    .onOk(() => app.characters.splice(i, 1));

const showDataLoad = ref(false);
const fileToLoad = ref(null);
const loadData = () => {
  const f: File = fileToLoad.value as unknown as File;
  const reader = new FileReader();
  reader.onload = (ev) => {
    const data = JSON.parse(ev.target?.result as string) as AppStore;
    app.loadData(data);
    showDataLoad.value = false;
  };
  reader.readAsText(f);
};

const showAbout = ref(false);

const leftDrawerOpen = ref(false);

const showIcon = (icon: string): string | undefined => ($q.screen.lt.sm ? icon : undefined);
const showLabel = (label: string): string | undefined => ($q.screen.gt.xs ? label : undefined);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
