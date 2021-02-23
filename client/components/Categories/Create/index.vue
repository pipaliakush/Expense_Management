<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          small
          class="mx-2"
          fab
          dark
          color="indigo"
        >
          <v-icon dark>
            mdi-plus
          </v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Add Category</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  class="mt-3"
                  label="Category Name*"
                  v-model="form.name"
                  :rules="rules"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <div>
                  <label for="icon">Choose Icon*</label>
                  <e-icon-picker
                    placeholder="Search"
                    v-model="form.icon"
                    required
                  />
                </div>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" text @click="save">
            Add Category
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      dialog: false,
      rules: [
        value => !!value || "Required.",
        value => (value && value.length >= 3) || "Min 3 characters"
      ],
      form: {
        name: "",
        icon: null
      }
    };
  },
  methods: {
    close() {
      this.dialog = false;
      this.form.name = "";
      this.form.icon = null;
    },
    save() {
      this.$store
        .dispatch("addCategory", this.form)
        .then(() => {
          this.$toasted.success("Category created successfully", {
            theme: "bubble",
            position: "top-right",
            duration: 3000
          });
          this.close();

          this.$store
            .dispatch("getCategories", this.$route.query)
            .then(() => {})
            .catch(() => {});
        })
        .catch(() => {});
    }
  }
};
</script>
