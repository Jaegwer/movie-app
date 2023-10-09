<script>
import '../src/assets/main.css';
import Navbar from "./components/Navbar.vue";
import ResultModal from './components/ResultModal.vue'
export default {
  components: {
    Navbar,
	ResultModal
  },
};
</script>

<template>
  <div id="app">
    <header>
      <div class="wrapper">
        <Navbar />
      </div>
    </header>
	<ResultModal/>
    <router-view />
  </div>
</template>

<style>
</style>
