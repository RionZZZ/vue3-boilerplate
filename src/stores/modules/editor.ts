import { defineStore } from 'pinia'
import { EditorType } from '@/types/editor'

interface EditorStore {
  readonly: boolean
  canEdit: boolean
  type: EditorType
}

export default defineStore('editor', {
  state: (): EditorStore => ({
    readonly: true,
    canEdit: false,
    type: EditorType.VIEW
  }),
  actions: {
    setType(type: EditorType) {
      this.type = type
      this.readonly = type !== EditorType.ADD
      this.canEdit = type === EditorType.EDIT
    }
  },
  persist: {
    storage: window.sessionStorage
  }
})
