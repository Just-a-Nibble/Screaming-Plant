import { ref } from 'vue'
import { defineStore } from 'pinia'

import { seconds } from '@/util/timeHelpers.js'

export const useUserStore = defineStore('user', () => {
  const isAdmin = ref(false)
  const token = ref(localStorage.getItem('admin-token') || '')

  console.log('useUserStore() created user store')

  function login(username, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if(username == 'admin' && password == 'password') {
          isAdmin.value = true
          token.value = 'This-is-a-fancy-token'

          localStorage.setItem('admin-token', token.value)

          // TODO: Include token with axios requests

          resolve(true)
        } else {
          isAdmin.value = false

          localStorage.removeItem('admin-token')

          resolve(false)
        }
      }, seconds(0.5))
    })
  }

  return { isAdmin, login }
})
