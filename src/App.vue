<template>
  <div id="app">
    <Nav></Nav>
    <router-view />
  </div>
</template>

<script>
import Nav from "../src/components/Nav.vue";
import { mapActions } from "vuex";
export default {
  name: "App",
  components: {
    Nav,
  },
  mounted() {
    this.authAction();
  },
  methods: {
    ...mapActions({
      authAction: "authAction",
    }),
  },
};
</script>

<style lang="css">
@import "./assets/css/style.css";
</style>
