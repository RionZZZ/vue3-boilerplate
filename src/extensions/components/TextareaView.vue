<template>
  <node-view-wrapper as="div">
    <el-input
      type="textarea"
      class="textarea"
      resize="none"
      v-model="model"
      :="node.attrs"
      :readonly="!canEdit"
      @change="textareaChange"
    />
  </node-view-wrapper>
</template>

<script name="TextareaView" setup lang="ts">
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3'
import { ref } from 'vue'
import { EditorStore } from '@/stores'
import { storeToRefs } from 'pinia'

const props = defineProps(nodeViewProps)
const model = ref(props.node.attrs.content)

const editorStore = EditorStore()
const { canEdit } = storeToRefs(editorStore)

const textareaChange = () => {
  props.updateAttributes({ content: model.value })
}
</script>

<style lang="scss" scoped>
.textarea {
  margin: 8px;
  :deep(.el-textarea__inner) {
    height: 100px;
    width: 800px;
    padding: 4px;
    font-size: 18px;
    box-shadow: none;
    border: 2px solid #000;
    &:focus {
      border-color: #56c4e7;
    }
    &[readonly] {
      border-color: #000;
    }
  }
}
</style>
