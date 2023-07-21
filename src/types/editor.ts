export enum EditorType {
  ADD = 'add', // 新增，除<添加组件>外均可编辑 - readonly: false, canEdit: false
  EDIT = 'edit', // 用户添加，除<添加组件>外均不可编辑 - readonly: true, canEdit: true
  VIEW = 'view' // 查阅模式，所有均不可编辑 - readonly:true, canEdit: false
}
