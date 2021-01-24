<template>
  <div>
    <Session></Session>
  </div>
</template>

<script>
import Session from "../components/Session";
import Nav from "../components/Nav";

export default {
  name: "Home",
  components: {
    Session,
    Nav
  },
  data() {
    return {
      singUpPage: false,
    }
  },
};
</script>
