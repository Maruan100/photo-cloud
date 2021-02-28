<template>
  <nav>
    <input type="checkbox" id="nav" class="hidden" />
    <label for="nav" class="nav-btn" tabindex="0">
      <i></i>
      <i></i>
      <i></i>
    </label>
    <div class="logo">
      <a>PHOTO CLOUD</a>
    </div>
    <div class="nav-wrapper">
      <ul>
        <li v-show="user">
          <a v-if="user">Welcome, {{ user.username }}!</a>
        </li>
        <!--
#TODO: Lenguage selecto -->
        <li><a>Language</a></li>
        <li @click="logout">
          <a>Logout</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Nav",
  props: {
    singUpPage: Boolean,
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },
  methods: {
    ...mapActions({
      logout: "logout",
    }),
  },
};
</script>
