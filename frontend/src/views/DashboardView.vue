<template>
  <v-container>
    <v-dialog
      v-model="showSensorView"
    >
      <SensorView
        :id="idSensorView"
        @close="closeSensorData"
      />
    </v-dialog>

    <v-row>
      <v-col>
        <v-card
          class="mx-auto"
          :min-width="350"
        >
          <template v-slot:text>
            <v-container>
              <v-row dense>
                <v-col
                  v-for="sensor in Sensors.sensors"
                  :key="sensor.id"
                  cols="auto"
                >
                  <SensorWidget
                    :id="sensor.id"
                    @click="viewSensorData"
                  />
                </v-col>
              </v-row>
            </v-container>
          </template>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { ref, onMounted } from 'vue'

  import Sensors from '@/objects/Sensors'

  import SensorWidget from '@/components/sensors/SensorWidget.vue'
  import SensorView from '@/components/sensors/SensorView.vue'

  const showSensorView = ref(false)
  const idSensorView = ref(null)

  onMounted(() => {
    Sensors.fetchContent()
  })

  function viewSensorData(id, show = true) {
    showSensorView.value = show
    idSensorView.value = id
  }

  function closeSensorData() {
    showSensorView.value = false
  }
</script>
