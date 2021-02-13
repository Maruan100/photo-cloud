<template>
  <div class="album-container">
    <form class="sign-in-form" @submit.prevent="createAlbum">
      <h2 class="title">Create album</h2>
      <div class="input-field">
        <i class="fas fa-user"></i>
        <input type="text" placeholder="Name" v-model="albumName" />
      </div>

      <input type="submit" :disabled="false" value="Create" class="btn solid" />
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "CreateAlbum",
  components: {},
  data() {
    return {
      albumName: "",
      error: "",
    };
  },
  async mounted() {},
  computed: {
    ...mapState({
      albums: (state) => state.albums.albums,
      user: (state) => state.auth.user,
    }),
  },
  methods: {
    ...mapActions({
      createAlbumStore: "createAlbum",
    }),
    createAlbum() {
      const { username, id } = this.user;
      this.error = "";
      if (!this.albumName) {
        this.error = "Please enter an album name";
        return;
      }
      const newAlbum = {
        name: this.albumName,
        owner: username,
        ownerId: id,
      };

      this.createAlbumStore(newAlbum);
    },
  },
};
</script>
