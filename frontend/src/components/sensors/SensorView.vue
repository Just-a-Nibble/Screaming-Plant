<template>
  <v-card>
    <template v-slot:title>
      <v-icon
        :icon="sensor.getIcon()"
        color="primary"
      ></v-icon>

      {{ sensor.getLabel() }}
    </template>

    <template v-slot:text>
      <v-container>
        <!-- TODO: This is kinda rough right now; improve -->

        <p><strong>Sensor:</strong> {{ sensor.sensor }}</p>
        <p><strong>Metric:</strong> {{ sensor.type }}</p>
        <p><strong>Value:</strong> {{ sensor.value }}</p>
      </v-container>
    </template>

    <template v-slot:actions>
      <v-spacer></v-spacer>

      <v-btn color="secondary" @click="forwardCloseDialog">Close</v-btn>
    </template>
  </v-card>
</template>

<script setup>
  import { computed } from 'vue'

  import Sensors from '@/objects/Sensors'

  const props = defineProps({
    id: String
  })

  const emit = defineEmits(['close'])

  const sensor = computed(() => Sensors.getSensor(props.id))

  function forwardCloseDialog() {
    emit('close')
  }
</script>
