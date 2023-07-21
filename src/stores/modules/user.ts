import { defineStore } from 'pinia'

interface UserStore {
  name: string
  token: string
}

export default defineStore('user', {
  state: (): UserStore => ({
    name: '',
    token: ''
  }),
  actions: {
    changeState(key: string, value: any) {
      this[key as keyof UserStore] = value
    },
    logout() {
      localStorage.clear()
      location.reload()
    }
  },
  persist: {
    storage: window.localStorage
  }
})
