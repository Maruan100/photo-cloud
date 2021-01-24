<template>
  <nav>
    <input type="checkbox" id="nav" class="hidden" />
    <label for="nav" class="nav-btn" tabindex="0">
      <i :class="{ white: !showSignUp }"></i>
      <i :class="{ white: !showSignUp }"></i>
      <i :class="{ white: !showSignUp }"></i>
    </label>
    <div class="nav-wrapper">
      <ul>
        <li v-show="user" ><a v-if="user" :class="{ 'white-text': showSignUp }">Welcome, {{user.username}}!</a></li>
        <li><a :class="{ 'white-text': showSignUp }">Language</a></li>
        <li @click="logout">
          <a :class="{ 'white-text': showSignUp }">Logout</a>
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
      showSignUp: (state) => state.auth.showSignUp,
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
