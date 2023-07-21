<template>
  <node-view-wrapper as="span" style="display: inline-block">
    <el-input
      type="text"
      class="input"
      v-model="model"
      :="node.attrs"
      :readonly="!canEdit"
      @change="inputChange"
    />
  </node-view-wrapper>
</template>

<script name="InputView" setup lang="ts">
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3'
import { ref } from 'vue'
import { EditorStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'

const props = defineProps(nodeViewProps)
const model = ref(props.node.attrs.content)

const editorStore = EditorStore()
const { canEdit } = storeToRefs(editorStore)

const inputChange = (value: string) => {
  const { inputType, min, max } = props.node.attrs
  if (value && inputType === 'number' && (min || min === 0 || max || max === 0)) {
    if (/^\d+$/.test(value)) {
      if (+value < min) {
        ElMessage.error('数字不得小于' + min)
        model.value = min
      } else if (+value > max) {
        ElMessage.error('数字不得大于' + max)
        model.value = max
      }
    } else {
      model.value = ''
      ElMessage.error('请填入数字')
    }
  }
  props.updateAttributes({ content: model.value })
}
</script>

<style lang="scss" scoped>
.input {
  width: 200px;
  overflow: hidden;
  :deep(.el-input__wrapper) {
    display: inline-block;
    box-shadow: none;
    border-radius: 0;
    &.is-focus {
      .el-input__inner {
        border-color: #56c4e7;
      }
    }
    .el-input__inner {
      font-size: 18px;
      padding: 6px;
      border-bottom: 2px solid #000;
      &[readonly] {
        border-color: #000;
      }
    }
  }
}
</style>
