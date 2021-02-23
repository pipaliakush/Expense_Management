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
          <span class="headline">Add Source</span>
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
            Add Source
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
      form: {
        name: "",
        type: "Bank"
      }
    };
  },
  methods: {
    close() {
      this.dialog = false;
      this.form.name = "";
      this.form.type = "Bank";
    },
    save() {
      this.$store
        .dispatch("addSource", this.form)
        .then(() => {
          this.$toasted.success("Source created successfully", {
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
