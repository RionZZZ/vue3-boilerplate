import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import EditorStore from './modules/editor'
import UserStore from './modules/user'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export { EditorStore, UserStore }

export default pinia
