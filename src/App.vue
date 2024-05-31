<template>
  <Header></Header>
  <div class="content">
    <router-view />
  </div>
</template>

<script setup>
import Header from './components/Header.vue';
</script>
<style scoped>
.content {
  height: calc(100% - 48px);
}
</style>
