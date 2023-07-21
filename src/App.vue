<template>
  <RouterView />
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
import getItem from './utils/getItem'
onMounted(() => {
  getItem()
})
</script>
