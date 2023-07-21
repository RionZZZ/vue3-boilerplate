import type { App, Component } from 'vue'

interface FileModule {
  default: Component
}

export default (app: App) => {
  // Auto import src/component/Global/**/*.vue
  const componentsContext = import.meta.glob('../components/Global/**/*.vue', { eager: true })
  console.log(componentsContext)

  Object.keys(componentsContext).forEach((key: string) => {
    const componentConfig = componentsContext[key] as FileModule
    const comp = componentConfig.default
    app.component(comp.name!, comp)
  })
}
