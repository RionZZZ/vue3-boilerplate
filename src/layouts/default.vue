<template>
  <el-container>
    <el-header>LYHZ MES系统</el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          :default-active="activePath"
          class="el-menu-vertical"
          text-color="#666"
          active-text-color="#3375e7"
          background-color="#fff"
          router
          :default-openeds="['basic', 'plan', 'manage']"
        >
          <el-sub-menu v-for="menu in menuList" :key="menu.key" :index="menu.key">
            <template #title>
              <span>{{ menu.title }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                v-for="subMenu in menu.children"
                :key="subMenu.name"
                :index="subMenu.path"
                >{{ subMenu.meta?.title }}</el-menu-item
              >
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view v-slot="{ Component }">
          <transition name="el-fade-in-linear" :duration="100" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup name="Layout" lang="ts">
import { onBeforeMount, ref, type Ref } from 'vue'
import { useRoute, onBeforeRouteLeave, type RouteRecordRaw } from 'vue-router'
import routes from 'virtual:generated-pages'
import { Meta } from '@/types/router'

interface Menu {
  title: string
  key: string
  children: RouteRecordRaw[]
}

onBeforeMount(() => {
  settingMenu()
})

const activePath = ref(useRoute().path)

onBeforeRouteLeave((to, _from, next) => {
  activePath.value = to.path
  next()
})

const menuList: Ref<Menu[]> = ref([])
const topMenu: Menu[] = [
  { title: '基础设置', key: 'basic', children: [] },
  { title: '生产计划', key: 'plan', children: [] },
  { title: '生产管理', key: 'manage', children: [] }
]
const settingMenu = () => {
  const menuRoutes = [...routes]
  menuRoutes
    .filter(route => (route.meta as Meta)?.menuIndex)
    .sort(
      (route1, route2) => +((route1.meta as Meta).menuIndex! > (route2.meta as Meta).menuIndex!) - 1
    )
    .forEach(route => {
      topMenu.forEach(menu => {
        if (route.path.indexOf(menu.key) === 1) {
          menu.children.push(route)
        }
      })
    })

  console.log(topMenu)
  menuList.value = topMenu
}
</script>
