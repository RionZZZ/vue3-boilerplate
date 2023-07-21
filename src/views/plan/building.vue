<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>制造工作卡</span>
        </div>
      </template>
      <el-form :inline="true">
        <el-form-item label="图号">
          <el-input />
        </el-form-item>
        <el-form-item label="名称">
          <el-input />
        </el-form-item>
        <el-form-item label="派工号">
          <el-input />
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card" style="margin-top: 20px">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="序号" width="55" />
        <el-table-column prop="taskId" label="图号" />
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="address" label="派工号" />
        <el-table-column prop="address" label="材料牌号" />
        <el-table-column prop="address" label="材料规格数量" />
        <el-table-column prop="address" label="代料" />
        <el-table-column prop="address" label="批次号" />
        <el-table-column prop="address" label="发料人" />
        <el-table-column prop="address" label="代料单号" />
        <el-table-column prop="address" label="时间" />
        <el-table-column prop="address" label="领料人" />
        <el-table-column prop="address" label="代料确认" />
        <el-table-column prop="address" label="操作" align="center" width="150">
          <template #default>
            <el-button link type="primary" size="small" @click="onAddClick">新增</el-button>
            <el-button link type="primary" size="small" @click="onEditClick">编辑</el-button>
            <el-button link type="primary" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="float: right; margin: 20px 0">
        <el-pagination
          :page-sizes="[10, 20, 50, 100]"
          :small="false"
          :disabled="false"
          :background="false"
          layout="sizes, prev, pager, next"
          :total="100"
        />
      </div>
    </el-card>
    <el-dialog
      v-model="tableHeaderDialog"
      title="设置表头"
      :append-to-body="true"
      width="750px"
      align-center
      destroy-on-close
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <el-form label-width="120px" inline ref="tableHeaderForm" :model="tableHeader">
        <el-form-item label="图号" prop="a">
          <el-input v-model="tableHeader.a" type="text" />
        </el-form-item>
        <el-form-item label="材料" prop="b">
          <el-input v-model="tableHeader.b" type="text" />
        </el-form-item>
        <el-form-item label="牌号" prop="c">
          <el-input v-model="tableHeader.c" type="text" />
        </el-form-item>
        <el-form-item label="批次号" prop="d">
          <el-input v-model="tableHeader.d" type="text" />
        </el-form-item>
        <el-form-item label="时间" prop="e">
          <el-input v-model="tableHeader.e" type="text" />
        </el-form-item>
        <el-form-item label="名称" prop="f">
          <el-input v-model="tableHeader.f" type="text" />
        </el-form-item>
        <el-form-item label="规格数量" prop="g">
          <el-input v-model="tableHeader.g" type="text" />
        </el-form-item>
        <el-form-item label="发料人" prop="h">
          <el-input v-model="tableHeader.h" type="text" />
        </el-form-item>
        <el-form-item label="领料人" prop="i">
          <el-input v-model="tableHeader.i" type="text" />
        </el-form-item>
        <el-form-item label="派工号" prop="j">
          <el-input v-model="tableHeader.j" type="text" />
        </el-form-item>
        <el-form-item label="代料" prop="k">
          <el-input v-model="tableHeader.k" type="text" />
        </el-form-item>
        <el-form-item label="代料单号" prop="l">
          <el-input v-model="tableHeader.l" type="text" />
        </el-form-item>
        <el-form-item label="代料确认" prop="m">
          <el-input v-model="tableHeader.m" type="text" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirmTableHeader"> 确定 </el-button>
          <el-button @click="handleClose"> 取消 </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      v-model="editorDialog"
      title="设置表单"
      :append-to-body="true"
      width="80%"
      align-center
      destroy-on-close
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <Tiptap lang="zh" v-model:content="content" />
      <template #footer>
        <el-button type="primary" @click="confirmEditor"> 确定 </el-button>
        <el-button @click="handleClose"> 取消 </el-button>
      </template>
    </el-dialog>
  </div>
</template>
<route> { meta: { title: "制造工作卡", menuIndex: '2-7' } } </route>

<script setup name="PlanBuilding" lang="ts">
import { reactive, ref } from 'vue'
import Tiptap from '@/components/Tiptap.vue'
import { FormInstance } from 'element-plus'

const tableData = reactive([{}])
const tableHeader = reactive({
  a: '',
  b: '',
  c: '',
  d: '',
  e: '',
  f: '',
  g: '',
  h: '',
  i: '',
  j: '',
  k: '',
  l: '',
  m: ''
})
const tableHeaderDialog = ref(false)
const tableHeaderForm = ref<FormInstance>()
const editorDialog = ref(false)
const content = ref('')

const onAddClick = () => {
  tableHeaderDialog.value = true
}
const handleClose = () => {
  tableHeaderForm.value?.resetFields()
  tableHeaderDialog.value = false
  editorDialog.value = false
}

const confirmTableHeader = () => {
  handleClose()
  editorDialog.value = true
  content.value = localStorage.getItem('editor') || ''
}

const confirmEditor = () => {
  localStorage.setItem('editor', content.value || '')
  content.value = ''
  handleClose()
}

const onEditClick = () => {
  editorDialog.value = true
  content.value = localStorage.getItem('editor') || ''
}
</script>
