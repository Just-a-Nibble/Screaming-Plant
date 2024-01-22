<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card
          class="mx-auto"
          :max-width="500"
          :min-width="300"
        >
          <template v-slot:title>
            Login
          </template>

          <template v-slot:text>
            <v-form
              validate-on="submit lazy"
              @submit.prevent="submit"
            >
              <v-text-field
                v-model="username"
                :rules="usernameRules"
                label="Username"
              ></v-text-field>

              <v-text-field
                v-model="password"
                type="password"
                :rules="passwordRules"
                label="Password"
              ></v-text-field>

              <v-btn
                type="submit"
                class="mt-2"
                :loading="loading"
                :disabled="loading"
                text="Submit"
                color="primary"
                block
              ></v-btn>
            </v-form>
          </template>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'
  import router from '@/router'

  import { useUserStore } from '@/stores/user'

  const requiredRule =
    (field) =>
      (value) => !!value
        || `${field} required`

  const minLengthRule =
    (minLength) =>
      (value) => value.length >= minLength
        || `Field must be over ${minLength} characters long`

  const userStore = useUserStore()

  const username = ref('')
  const password = ref('')

  const usernameRules = [requiredRule('Username'), minLengthRule(5)]
  const passwordRules = [requiredRule('Password'), minLengthRule(5)]

  const loading = ref(false)

  async function submit(event) {
    loading.value = true

    if ((await event).valid) {
      if (await userStore.login(username.value, password.value)) {
        router.push({ name: 'dashboard' })
      } else {
        console.log('Login failed')
      }
    }

    loading.value = false
  }
</script>
