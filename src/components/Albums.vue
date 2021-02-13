<template>
  <div class="album-container">
    <h2 class="title">My albums:</h2>
    <div class="cards">
      <div
        class="card card1"
        v-for="(album, idx) in albums"
        :key="idx"
        @click="openAlbumDetail(album)"
      >
        <div class="container2">
          <img src="https://loremflickr.com/640/360" alt="las vegas" />
        </div>
        <div class="details">
          <h3 class="alint-center">{{ album.name }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Albums",
  components: {},
  data() {
    return {};
  },
  async mounted() {
    console.log(11);
    this.getAlbums();
  },
  computed: {
    ...mapState({
      albums: (state) => state.albums.albums,
    }),
  },
  methods: {
    ...mapActions({
      getAlbums: "getAlbums",
    }),
    openAlbumDetail(album) {
      this.$router.push({ name: "AlbumDetailPage", params: { id: album.id } });
    },
  },
};
</script>
