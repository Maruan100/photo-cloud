<template>
  <div>
    <div class="container" :class="{ 'sign-up-mode': showSignUp }">
      <div class="forms-container">
        <div class="signin-signup">
          <form class="sign-in-form" @submit.prevent="login">
            <h2 class="title">Sign in</h2>
            <div class="input-field">
              <i class="fas fa-user"></i>
              <input
                type="text"
                v-model="$v.username.$model"
                placeholder="Username"
              />
            </div>
            <div class="input-field">
              <i class="fas fa-lock"></i>
              <input
                type="password"
                v-model="$v.password.$model"
                placeholder="Password"
              />
            </div>
            <p v-if="error.message" class="error">
              {{ error.message }}
            </p>

            <input
              type="submit"
              :disabled="!validForm"
              value="Login"
              class="btn solid"
            />
          </form>
          <form class="sign-up-form" @submit.prevent="singUp">
            <h2 class="title">Sign up</h2>
            <div class="input-field">
              <i class="fas fa-user"></i>
              <input
                type="text"
                v-model="$v.username.$model"
                placeholder="Username"
              />
            </div>
            <div class="input-field">
              <i class="fas fa-envelope"></i>
              <input
                type="email"
                v-model="$v.email.$model"
                placeholder="Email"
              />
            </div>
            <div class="input-field">
              <i class="fas fa-lock"></i>
              <input
                type="password"
                v-model="$v.password.$model"
                placeholder="Password"
              />
            </div>
            <p v-if="error.message" class="error">
              {{ error.message }}
            </p>
            <input
              type="submit"
              :disabled="!validForm || $v.email.$invalid"
              class="btn"
              value="Sign up"
            />
          </form>
        </div>
      </div>

      <div class="panels-container">
        <div class="panel left-panel">
          <div class="content">
            <h3>New here ?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button
              class="btn transparent"
              id="sign-up-btn"
              @click="changeAction"
            >
              Sign up
            </button>
          </div>
          <img src="img/log.svg" class="image" alt="" />
        </div>
        <div class="panel right-panel">
          <div class="content">
            <h3>One of us ?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
            <button
              class="btn transparent"
              id="sign-in-btn"
              @click="changeAction"
            >
              Sign in
            </button>
          </div>
          <img src="img/register.svg" class="image" alt="" />
        </div>
      </div>
    </div>

    <Modal
      :showModal="confirmPassword"
      @closeModal="confirmPassword = $event"
      @getCode="confirmSingUp($event)"
    ></Modal>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
import Modal from "./Modal";

export default {
  name: "Session",
  components: {
    Modal,
  },
  data() {
    return {
      username: "",
      password: "",
      email: "",
      confirmPassword: false,
      error: "",
    };
  },
  computed: {
    ...mapState({
      showSignUp: (state) => state.auth.showSignUp,
    }),
    validForm() {
      return !this.$v.username.$invalid && !this.$v.password.$invalid;
    },
  },
  methods: {
    ...mapActions({
      loginStore: "login",
      singUpStore: "singUp",
      confirmSingUpStore: "confirmSingUp",
      authActionStore: "authAction",
      changeActionStore: "changeAction",
    }),
    changeAction(value) {
      this.changeActionStore(!this.showSignUp);
      this.error = "";
    },
    async login() {
      try {
        await this.loginStore({
          username: this.username,
          password: this.password,
        });
        this.error = "";
        this.$router.push("/albums");
      } catch (error) {
        this.error = error;
      }
    },
    async singUp() {
      try {
        await this.singUpStore({
          username: this.username,
          email: this.email,
          password: this.password,
        });
        this.error = "";
        this.confirmPassword = true;
      } catch (error) {
        this.error = error;
      }
    },
    async confirmSingUp(code) {
      try {
        await this.confirmSingUpStore({
          username: this.username,
          code: code,
        });
        await this.loginStore({
          username: this.username,
          password: this.password,
        });
        this.$router.push("/albums");
      } catch (error) {
        console.error(error);
        this.error = error;
      }
    },
  },
  validations: {
    username: { required, minLength: minLength(1), maxLength: maxLength(50) },
    email: { required, email },
    password: { required, minLength: minLength(6) },
  },
};
</script>
