import { reactive } from 'vue'

import { currentTime, seconds } from '@/util/timeHelpers.js'

class Sensor {
  constructor(id, initializerData = false) {
    this.id = id

    this.ready = !!initializerData
    this.error = false

    this.type = initializerData && initializerData.type || false
    this.sensor = initializerData && initializerData.sensor || false
    this.value = initializerData && initializerData.value || false

    this.lastRequestTime = -1

    if (!initializerData) {
      this.fetchContent()
    }
  }

  getLabel() {
    if (!this.error) {
      if (this.ready) {
        return ({
          'temperature': 'Temperature Sensor',
          'light':       'Light Sensor',
          'moisture':    'Moisture Sensor'
        })[this.type] || 'Unknown Sensor Type'
      } else {
        return 'Loading...'
      }
    } else {
      return 'Error'
    }
  }

  getIcon() {
    if (!this.error) {
      if (this.ready) {
        return ({
          'temperature': 'mdi-thermometer',
          'light':       'mdi-weather-sunny',
          'moisture':    'mdi-water-outline'
        })[this.type] || 'mdi-help-circle-outline'
      } else {
        return 'mdi-dots-horizontal'
      }
    } else {
      return 'mdi-alert-circle-outline'
    }
  }

  fetchContent(force = false) {
    if (!force && (currentTime() - this.lastRequestTime) < seconds(5)) {
      return
    }

    console.log('Sensor.fetchContent called')

    // TODO: Replace placeholder with real requests
    setTimeout((data) => {
      const { id, type, sensor, value } = data

      this.ready = true
      this.error = false

      this.id = id
      this.type = type
      this.sensor = sensor
      this.value = value
    }, seconds(0.5), {
      id: this.id,
      type: ['temperature', 'light', 'moisture'][Math.floor(Math.random() * 3)],
      sensor: ['mcp9808', 'ltr303', 'AdaStemmaMoisture'][Math.floor(Math.random() * 3)],
      value: Math.random() * 100
    })

    this.lastRequestTime = currentTime()
  }
}

export default new class Sensors {
  constructor() {
    this.sensors = reactive([])

    this.lastRequestTime = -1
  }

  getSensor(sensorId, initializerData = false) {
    if (!sensorId) {
      console.warn('Sensors getSensor missing sensorId')

      return false
    }

    let sensor = this.sensors.find(sensor => sensor.id == sensorId)
    if (sensor) {
      return sensor
    }
    
    sensor = reactive(new Sensor(sensorId, initializerData))

    this.sensors.push(sensor)

    return sensor
  }

  fetchContent(force = false) {
    if (!force && (currentTime() - this.lastRequestTime) < seconds(5)) {
      return
    }

    console.log('Sensors.fetchContent() called')

    // TODO: Replace placeholder with real requests
    setTimeout((data) => {
      data.sensors.forEach((sensor) => {
        this.getSensor(sensor.id, sensor)
      })
    }, seconds(0.5), {
      sensors:
        this.sensors.length == 0
          ? (new Array(5)).fill(0)
            .map((_, i) => ({
              id: String.fromCharCode(i + 65),
              type: ['temperature', 'light', 'moisture'][Math.floor(Math.random() * 3)],
              sensor: ['mcp9808', 'ltr303', 'AdaStemmaMoisture'][Math.floor(Math.random() * 3)],
              value: Math.round(Math.random() * 100)
            }))
          : this.sensors
    })

    this.lastRequestTime = currentTime()
  }
}
