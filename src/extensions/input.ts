import { Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import InputView from './components/InputView.vue'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    input: {
      setInput: (options?: any) => ReturnType
    }
  }
}

const Input = Node.create({
  name: 'input',
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
      inputType: {
        default: 'text'
      },
      min: {
        default: null
      },
      max: {
        default: null
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
    return [{ tag: 'input' }]
  },
  renderHTML({ HTMLAttributes }) {
    return ['input', HTMLAttributes]
  },
  addCommands() {
    return {
      setInput:
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
    return VueNodeViewRenderer(InputView)
  }
})

export default Input
