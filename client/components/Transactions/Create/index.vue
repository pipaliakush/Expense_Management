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
          <span class="headline">Add Transaction</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <label for="type">Transaction Type</label>
            <v-radio-group v-model="form.type" row>
              <v-radio label="Income" value="income"></v-radio>
              <v-radio label="Expense" value="expense"></v-radio>
            </v-radio-group>
            <v-row>
              <v-col cols="12">
                <v-select
                  v-model="form.sourceId"
                  :items="sourcesOptions"
                  item-text="name"
                  item-value="_id"
                  menu-props="auto"
                  label="Select Source"
                  hide-details
                  prepend-icon="mdi-cash"
                  single-line
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  prepend-icon="mdi-format-title"
                  label="Title"
                  v-model="form.title"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  prepend-icon="mdi-currency-usd"
                  label="Amount"
                  type="number"
                  v-model="form.amount"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <vc-date-picker
                  v-model="form.spentOn"
                  :model-config="modelConfig"
                >
                  <template #default="{ inputValue, inputEvents }">
                    <v-text-field
                      prepend-icon="mdi-calendar-month"
                      label="Transaction Date"
                      :value="inputValue"
                      v-on="inputEvents"
                    ></v-text-field>
                  </template>
                </vc-date-picker>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <h3 class="pl-1">Category</h3>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                v-for="item in categoriesOptions"
                :key="item._id"
                class="categories-list"
                :class="form.categoryId == item._id ? 'selected-category' : ''"
                cols="3"
                @click="selectedCategory(item)"
              >
                <i :class="item.icon" class="fa-3x" aria-hidden="true"></i>
                <br />
                <span>{{ item.name }}</span>
              </v-col>
              <v-col class="categories-list" cols="3">
                <Create class="mb-2" />
                <span>Add Category</span>
              </v-col>
            </v-row>
            <v-row class="pl-3 pr-3">
              <v-col cols="12">
                <v-textarea
                  name="input-7-1"
                  label="Note"
                  rows="3"
                  v-model="form.note"
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <FileReader @load="form.image = $event" />
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
import Create from "@/components/Categories/Create/index.vue";
import FileReader from "@/components/Transactions/FileReader/index.vue";

export default {
  components: { Create, FileReader },
  data() {
    return {
      dialog: false,
      form: {
        type: "expense",
        sourceId: null,
        title: "",
        amount: null,
        spentOn: new Date().toISOString(),
        categoryId: null,
        note: "",
        image: null
      },
      selectedImage: null,
      modelConfig: {
        type: "string",
        mask: "iso"
      }
    };
  },
  mounted() {
    this.$store.dispatch("getCategories").then(() => {});
    this.$store.dispatch("getSources").then(() => {});
  },
  computed: {
    categoriesOptions() {
      return this.$store.state.categoriesList;
    },
    sourcesOptions() {
      return this.$store.state.sourcesList;
    }
  },
  methods: {
    // encodeImageFileAsURL() {
    //   let reader = new FileReader();
    //   reader.onloadend = function() {
    //     // this.form.image = reader.result;
    //     console.log(reader.result);
    //   };
    //   reader.readAsDataURL(this.selectedImage);
    // },
    selectedCategory(item) {
      this.form.categoryId = item._id;
    },
    close() {
      this.dialog = false;
      this.form.name = "";
      this.form.type = "Bank";
    },
    save() {
      this.$store
        .dispatch("addTransaction", this.form)
        .then(() => {
          this.$toasted.success("Transaction created successfully", {
            theme: "bubble",
            position: "top-right",
            duration: 3000
          });
          this.close();

          this.$store
            .dispatch("getTransactions", this.$route.query)
            .then(() => {})
            .catch(() => {});
        })
        .catch(() => {});
    }
  }
};
</script>

<style scoped>
.date-input {
  color: white;
}

.categories-list {
  text-align: center;
}

.selected-category {
  background: cyan;
  color: black;
  border-radius: 10%;
}
</style>
