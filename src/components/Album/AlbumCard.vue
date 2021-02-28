<template>
  <div class="card" @click="openAlbumDetail(album)">
    <amplify-s3-image
      v-if="photo"
      level="protected"
      :img-key="photo.thumbnail ? photo.thumbnail.key : photo.fullsize.key"
    ></amplify-s3-image>

    <img
      v-else
      class="card__img"
      src="https://placebear.com/640/360"
      alt="Avatar"
      style="width:100%"
    />

    <div class="card__container">
      <h4 class="card__container__text">
        <b>{{ album.name }}</b>
      </h4>
      <p class="card__container__subtext">Photos: {{ this.album.photos.items.length }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AlbumCard",
  props: {
    album: {
      type: Object,
      required: true,
      default: null,
    },
  },
  data() {
    return {
      photo: null,
    };
  },
  async mounted() {
    this.photo = this.album.photos.items[0];
  },
  computed: {},
  methods: {
    openAlbumDetail(album) {
      this.$router.push({ name: "AlbumDetailPage", params: { id: album.id } });
    },
  },
};
</script>
