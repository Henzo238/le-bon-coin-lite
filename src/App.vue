<script setup>
import { RouterView } from 'vue-router'
import Header from '../src/components/theHeader.vue'
import Footer from '../src/components/theFooter.vue'
</script>

<template>
  <main>
    <Header />
    <RouterView />
    <Footer />
  </main>
</template>

<style scoped></style>
