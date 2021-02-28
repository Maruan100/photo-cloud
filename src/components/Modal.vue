<template>
  <div class="modal-bg" :class="{ 'bg-active': showModal }">
    <div class="modal">
      <h4>Enter your code. Please check your email</h4>
      <form @submit.prevent="sendCode">
        <div class="input-field">
          <input type="text" placeholder="Code" v-model="code" />
        </div>
        <input type="submit" value="Send" class="btn solid" />
      </form>
      <span class="icon-cross modal-close" @click="closeModal"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    showModal: Boolean,
  },
  data() {
    return {
      code: "",
    };
  },
  methods: {
    closeModal(event) {
      this.$emit("closeModal", false);
    },
    sendCode() {
      this.$emit("getCode", this.code);
    },
  },
};
</script>

<style lang="css">
.modal-bg {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0, 5s;
}

.bg-active {
  visibility: visible;
  opacity: 1;
}

.modal {
  position: relative;
  background-color: #fff;
  height: 45%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  border-radius: 2%;
}

.mini {
  width: 130px;
  height: 80px;
}

.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
  margin: 15px;
  cursor: pointer;
}
</style>
