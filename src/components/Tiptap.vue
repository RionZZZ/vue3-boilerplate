<template>
  <div class="tiptap-editor">
    <el-button @click="setType(EditorType.ADD)">编辑表单</el-button>
    <el-button @click="setType(EditorType.EDIT)">填写表单</el-button>
    <el-button @click="setType(EditorType.VIEW)">预览</el-button>
    <elementTiptap
      lang="zh"
      :="$attrs"
      :extensions="extensions"
      :enableCharCount="false"
      :readonly="readonly"
      editorClass="editor"
      editorContentClass="editor-content"
      :editorMenubarClass="['editor-menu', readonly && 'hide-menu']"
    />
  </div>
</template>

<script setup name="Tiptap" lang="ts">
import {
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  FontSize,
  BulletList,
  OrderedList,
  TaskList,
  Table,
  Image,
  TextAlign,
  Indent,
  HorizontalRule,
  HardBreak,
  History,
  Color,
  Highlight,
  Fullscreen
} from 'element-tiptap-vue3-fixed'
import Component from '@/extensions/component'
import Input from '@/extensions/input'
import Textarea from '@/extensions/textarea'
import { EditorType } from '@/types/editor'
import { EditorStore } from '@/stores'
import { storeToRefs } from 'pinia'

defineOptions({
  inheritAttrs: false
})

const extensions = [
  Doc,
  Text,
  Paragraph,
  Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
  Bold,
  Underline,
  Italic,
  FontSize,
  BulletList,
  OrderedList,
  TaskList,
  Table,
  Image,
  TextAlign,
  Indent,
  HorizontalRule,
  HardBreak,
  History,
  Color,
  Highlight,
  Fullscreen,
  Input,
  Textarea,
  Component
]

const editorStore = EditorStore()
const { setType } = editorStore
const { readonly } = storeToRefs(editorStore)
</script>
<style lang="scss" scoped>
.tiptap-editor {
  height: 70vh;
  :deep(.editor) {
    border: 1px solid #ebeef5;
    .editor-content,
    .editor-menu {
      border: none;
      border-radius: 8px;
      &.hide-menu {
        display: none;
      }
    }
  }
}
</style>
