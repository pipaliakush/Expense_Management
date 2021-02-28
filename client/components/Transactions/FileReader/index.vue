<template>
  <div>
    <v-file-input
      counter
      show-size
      truncate-length="15"
      :rules="rules"
      accept="image/jpg, image/jpeg"
      placeholder="Pick an image"
      v-model="selectedImage"
      @change="encodeImageFileAsURL"
    ></v-file-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rules: [
        value =>
          !value ||
          value.size < 2000000 ||
          "Image size should be less than 2 MB!"
      ]
    };
  },
  computed: {
    selectedImage: {
      get: function() {
        return this.$store.state.selectedImage;
      },
      set: function(val) {
        this.$store.commit("selectedImage", val);
      }
    }
  },
  methods: {
    encodeImageFileAsURL() {
      if (this.selectedImage != null && this.selectedImage != undefined) {
        const reader = new FileReader();

        reader.onload = e => this.$emit("load", e.target.result);
        reader.readAsDataURL(this.selectedImage);
      } else {
        this.$emit("load", "");
      }
    }
  }
};
</script>
