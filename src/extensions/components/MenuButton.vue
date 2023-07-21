<template>
  <el-popover placement="bottom" trigger="click" popper-class="el-tiptap-popper">
    <div class="el-tiptap-popper__menu">
      <div class="el-tiptap-popper__menu__item" @click="openInputDialog">
        <span>输入框（单行）</span>
      </div>
      <div class="el-tiptap-popper__menu__item" @click="openTextareaDialog">
        <span>输入框（多行）</span>
      </div>
    </div>
    <template #reference>
      <span>
        <el-button class="el-tiptap-editor__command-button command-button" size="small"
          >添加组件</el-button
        >
      </span>
    </template>
  </el-popover>
  <el-dialog
    v-model="inputDialog"
    title="输入框属性"
    :append-to-body="true"
    width="400px"
    destroy-on-close
    :before-close="() => handleClose(inputForm)"
  >
    <el-form ref="inputForm" label-width="120px" :model="inputAttrs">
      <el-form-item label="类型" prop="inputType">
        <el-select v-model="inputAttrs.inputType">
          <el-option label="数字" value="number" />
          <el-option label="文本" value="text" />
        </el-select>
      </el-form-item>
      <el-form-item label="最小值" prop="min" v-show="inputAttrs.inputType === 'number'">
        <el-input v-model="inputAttrs.min" type="number" />
      </el-form-item>
      <el-form-item label="最大值" prop="max" v-show="inputAttrs.inputType === 'number'">
        <el-input v-model="inputAttrs.max" type="number" />
      </el-form-item>
      <el-form-item label="提示" prop="placeholder">
        <el-input v-model="inputAttrs.placeholder" type="text" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="confirmInputDialog"> 确定 </el-button>
        <el-button @click="handleClose(inputForm)"> 取消 </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <el-dialog
    v-model="textareaDialog"
    title="文本域属性"
    :append-to-body="true"
    width="400px"
    destroy-on-close
    :before-close="() => handleClose(textareaForm)"
  >
    <el-form ref="textareaForm" label-width="120px" :model="textareaAttrs">
      <el-form-item label="提示" prop="placeholder">
        <el-input v-model="textareaAttrs.placeholder" type="text" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="confirmTextareaDialog"> 确定 </el-button>
        <el-button @click="handleClose(textareaForm)"> 取消 </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script name="MenuButton" setup lang="ts">
import { FormInstance } from 'element-plus'
import { reactive, ref } from 'vue'

const props = defineProps(['editor'])

const inputAttrs = reactive({
  inputType: '',
  min: '',
  max: '',
  placeholder: ''
})
const inputDialog = ref(false)
const inputForm = ref<FormInstance>()
const openInputDialog = () => {
  inputDialog.value = true
}
const confirmInputDialog = () => {
  props.editor.commands.setInput(inputAttrs)
  handleClose(inputForm.value)
}
const handleClose = (form: FormInstance | undefined) => {
  form!.resetFields()
  inputDialog.value = false
  textareaDialog.value = false
}

const textareaAttrs = reactive({
  placeholder: ''
})
const textareaDialog = ref(false)
const textareaForm = ref<FormInstance>()
const openTextareaDialog = () => {
  textareaDialog.value = true
}
const confirmTextareaDialog = () => {
  console.log(textareaAttrs)

  props.editor.commands.setTextarea(textareaAttrs)
  handleClose(textareaForm.value)
}
</script>

<style lang="scss" scoped>
.command-button {
  width: 80px;
  border-radius: 8px;
}
</style>
