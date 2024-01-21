<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <v-app>
    <v-app-bar
      color="primary"
      :elevation="2"
    >
      <template v-slot:prepend>
        <v-icon
          icon="mdi-leaf"
          size="x-large"
        ></v-icon>
      </template>

      <template v-slot:title>
        Screaming Plant
      </template>
    </v-app-bar>

    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

