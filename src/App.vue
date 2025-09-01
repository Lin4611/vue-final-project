<script setup>
import { provide} from 'vue';
import { RouterLink, RouterView } from 'vue-router'
const api='https://todolist-api.hexschool.io/';
provide('api',api);
</script>
<template>
  <RouterView />
</template>

<style scoped>
</style>