<template>
  <v-card
    @click="forwardClickEvent"
    color="primary"
    density="compact"
    link
  >
    <template v-slot:prepend>
      <v-icon
        :icon="sensor.getIcon()"
        :size="40"
      ></v-icon>
    </template>

    <template v-slot:title>
      {{ sensor.getLabel() }}
    </template>

    <template v-slot:subtitle>
      <span v-if="sensor.type == 'temperature'">{{ sensor.value }}&deg;C</span>
      <span v-else-if="sensor.type == 'light'">{{ sensor.value }} lumen</span>
      <span v-else-if="sensor.type == 'moisture'">{{ sensor.value }} moistness</span>
    </template>
  </v-card>
</template>

<script setup>
  import { computed } from 'vue'

  import Sensors from '@/objects/Sensors'

  const props = defineProps({
    id: String
  })

  const emit = defineEmits(['click'])

  const sensor = computed(() => Sensors.getSensor(props.id))

  function forwardClickEvent() {
    emit('click', props.id)
  }
</script>
