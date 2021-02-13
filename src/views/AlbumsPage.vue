<template>
<div>
<CreateAlbum></CreateAlbum>
<Albums></Albums>
</div>
</template>

<script>
import Albums from '../components/Albums.vue';
import CreateAlbum from '../components/CreateAlbum.vue';
export default {
  name: "AlbumsPage",
  components: {
    Albums,
    CreateAlbum
  },
  data() {
    return {
    };
  },
  computed: {

  },
  methods: {
  },
};
</script>
