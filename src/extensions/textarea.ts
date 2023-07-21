import { Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import TextareaView from './components/TextareaView.vue'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    textarea: {
      setTextarea: (options?: any) => ReturnType
    }
  }
}

const Textarea = Node.create({
  name: 'textarea',
  group: 'inline',
  inline: true,
  selectable: false,
  atom: true,

  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: element => element.getAttribute('id'),
        renderHTML: attributes => {
          if (!attributes.id) {
            return {}
          }
          return {
            id: attributes.id
          }
        }
      },
      placeholder: {
        default: ''
      },
      content: {
        default: ''
      }
    }
  },
  parseHTML() {
    return [{ tag: 'textarea' }]
  },
  renderHTML({ HTMLAttributes }) {
    return ['textarea', HTMLAttributes]
  },
  addCommands() {
    return {
      setTextarea:
        options =>
          ({ commands }) => {
            return commands.insertContent({
              type: this.name,
              attrs: options ?? {}
            })
          }
    }
  },
  addNodeView() {
    return VueNodeViewRenderer(TextareaView)
  }
})

export default Textarea
