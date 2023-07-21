import type { App } from 'vue'
// import GlobalComponents from './components'
import Plugins from './plugins'

export default (app: App) => {
  // GlobalComponents(app)
  Plugins(app)
}
