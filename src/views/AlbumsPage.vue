<template>
  <div>
    <CreateAlbum></CreateAlbum>
    <div class="flex-container">
      <AlbumCard
        :album="album"
        v-for="album in albums"
        :key="album.id"
      ></AlbumCard>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import AlbumCard from "../components/Album/AlbumCard.vue";
import CreateAlbum from "../components/Album/CreateAlbum.vue";
export default {
  name: "AlbumsPage",
  components: {
    CreateAlbum,
    AlbumCard,
  },
  data() {
    return {};
  },
  mounted() {
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
  },
};
</script>
