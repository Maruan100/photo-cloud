<template>
  <div>
    <div @click="goBack" class="goBack">
      <p><i class="fas fa-arrow-left"></i>Return</p>
    </div>
    <FileSelector></FileSelector>
    <div class="flex-container">
      <PhotoCard
        :photo="photo"
        v-for="photo in photos"
        :key="photo.id"
      ></PhotoCard>
    </div>
  </div>
</template>

<script>
import PhotoCard from "../components/Photo/PhotoCard.vue";
import FileSelector from "../components/Photo/FileSelector.vue";

import { mapActions } from "vuex";
export default {
  name: "AlbumDetailPage",
  components: {
    PhotoCard,
    FileSelector
  },
  data() {
    return {
      photos: [],
      albumName: "",
    };
  },
  mounted() {
    this.getPhotos();
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  methods: {
    ...mapActions({
      getAlbum: "getAlbum",
      createPhoto: "createPhoto",
    }),
    goBack() {
      this.$router.push({ name: "AlbumsPage" });
    },
    async onFileChange(file) {
      if (!file.target || !file.target.files[0]) {
        return;
      }
      try {
        this.createPhoto({
          file: file.target.files[0],
          id: this.id,
        });
        this.getPhotos();
      } catch (error) {
        console.log("error create photo", error);
      }
    },
    async getPhotos() {
      const album = await this.getAlbum(this.id);
      this.photos = album.data.getAlbum.photos.items;
      this.albumName = album.data.getAlbum.name;
    },
  },
};
</script>

<style scoped>
amplify-s3-image {
  --width: 75%;
}

.center {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.form-input {
  width: 250px;
  padding: 20px;
  background: #fff;
}
.form-input input {
  display: none;
}
.form-input label {
  cursor: pointer;
}

.form-input img {
  width: 100%;
  display: none;
  margin-top: 10px;
}
</style>
