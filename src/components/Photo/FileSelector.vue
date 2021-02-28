<template>
  <div class="file-selector">
    <div class="file-selector__drop"  :style="selectedFile ? 'border: initial' : null" >
      <div
        class="file-selector__drop--icon"
        ref="drag"
        :style="isOver ? 'background-color: rgba(0, 126, 255, 0.2);' : null"
        @dragover.prevent
        @drop.prevent
        @drop="onGetFile"
      >
        <span v-show="!selectedFile">
          <i class="fas fa-cloud-upload-alt"></i>
          <p class="file-selector__drop__text">Drag your photo here</p>
          <label class="file-selector__drop__text" for="upload-logo">
            or upload from your computer
          </label>
          <input
            id="upload-logo"
            ref="fileInput"
            type="file"
            name="logo"
            accept="image/*"
            @change="onGetFile"
          />
        </span>
        <img v-show="selectedFile" class="updated-file" :src="selectedFile" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FileSelector",
  data() {
    return {
      mime_type: null,
      selectedFile: null,
      isOver: null,
    };
  },
  mounted() {
    this.$refs.drag.addEventListener("dragover", () => {
      this.isOver = true;
    });
    this.$refs.drag.addEventListener("dragleave", () => {
      this.isOver = false;
    });
  },
  computed: {
    isValidImg() {
      return (
        this.mime_type === "image/jpeg" ||
        this.mime_type === "image/png" ||
        this.mime_type === "image/svg+xml" ||
        this.mime_type === "image/gif"
      );
    },
  },
  methods: {
    onGetFile(e) {
      const image = e.dataTransfer
        ? e.dataTransfer.files[0]
        : e.target.files[0];

      this.mime_type = image.type;

      if (this.isValidImg) {
        this.renderImage(image);
      } else {
        this.removeFile();
      }
    },
    renderImage(image) {
      if (typeof FileReader === "function") {
        let reader = new FileReader();
        reader.onload = (f) => {
          this.selectedFile = f.target.result;
        };
        reader.readAsDataURL(image);
      } else {
        alert("Sorry, FileReader not supported");
      }
    },
    removeFile() {
      this.$refs.cropper.destroy();
      this.$refs.fileInput.value = "";
      this.image = "";
      this.isOver = false;
    },
  },
};
</script>
