<template>
  <Header></Header>
  <div class="mt-5">
    <router-view />
  </div>
</template>

<script setup>
import Header from './components/Header.vue';
</script>
<style scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
