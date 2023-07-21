import { Editor, Extension } from '@tiptap/core'
import MenuButton from './components/MenuButton.vue'

const Component = Extension.create({
  name: 'component',

  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor }: { editor: Editor }) {
        return {
          component: MenuButton,
          componentProps: {
            editor
          }
        }
      }
    }
  }
})

export default Component
