<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn x-small color="primary" dark v-bind="attrs" v-on="on">
          Edit
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Edit Source</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <label for="type">Source Type</label>
            <v-radio-group v-model="form.type" row>
              <v-radio label="Bank" value="Bank"></v-radio>
              <v-radio label="Wallet" value="Wallet"></v-radio>
              <v-radio label="Credit Card" value="Credit Card"></v-radio>
            </v-radio-group>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  class="mt-3"
                  label="Name"
                  v-model="form.name"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" text @click="save">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    formData: {
      type: Object
    }
  },
  data() {
    return {
      dialog: false,
      form: {
        name:
          this.formData.name && this.formData.name ? this.formData.name : "",
        type: this.formData && this.formData.type ? this.formData.type : null
      }
    };
  },
  watch: {
    formData() {
      this.form.name = this.formData.name;
      this.form.type = this.formData.type;
    }
  },
  methods: {
    close() {
      this.dialog = false;
      this.form.name = this.formData.name;
      this.form.type = this.formData.type;
    },
    save() {
      const data = {
        id: this.formData._id,
        postData: this.form
      };
      this.$store
        .dispatch("updateSource", data)
        .then(() => {
          this.$toasted.success("Source updated successfully", {
            theme: "bubble",
            position: "top-right",
            duration: 3000
          });
          this.close();

          this.$store
            .dispatch("getSources", this.$route.query)
            .then(() => {})
            .catch(() => {});
        })
        .catch(() => {});
    }
  }
};
</script>
