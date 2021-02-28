<template>
  <div class="card">
    <amplify-s3-image
      level="protected"
      :img-key="photo.thumbnail ? photo.thumbnail.key : photo.fullsize.key"
    
    ></amplify-s3-image>
    <div class="card__container">
      <h4 class="card__container__text">
        <b></b>
      </h4>
      <p class="card__container__subtext">{{ this.photo.createdAt }}</p>
    </div> 
  </div>
</template>

<script>
export default {
  name: "PhotoCard",
  props: {
    photo: {
      type: Object,
      required: true,
      default: null,
    },
  },
};
</script>