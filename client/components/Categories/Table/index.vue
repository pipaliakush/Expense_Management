<template>
  <v-simple-table class="mt-2">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Icon
          </th>
          <th class="text-left">
            Actions
          </th>
        </tr>
      </thead>
      <tbody v-if="categoriesList.length">
        <tr v-for="item in categoriesList" :key="item._id">
          <td>{{ item.name }}</td>
          <td><i :class="item.icon" class="fa-2x" aria-hidden="true"></i></td>
          <td v-if="!item.isDefault" class="d-flex text-center align-center">
            <Edit :formData="item" />
            <div class="ml-2">
              <v-btn
                x-small
                color="error"
                dark
                @click="deleteCategory(item._id)"
              >
                Delete
              </v-btn>
            </div>
          </td>
          <td v-else>-</td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="3">
            No Records Found
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import Edit from "@/components/Categories/Edit/index.vue";

export default {
  components: {
    Edit
  },
  data() {
    return {};
  },
  computed: {
    categoriesList() {
      return this.$store.state.categoriesList;
    }
  },
  methods: {
    deleteCategory(id) {
      this.$store
        .dispatch("deleteCategory", id)
        .then(() => {
          this.$toasted.success("Category deleted successfully", {
            theme: "bubble",
            position: "top-right",
            duration: 3000
          });

          this.$store
            .dispatch("getCategories", this.$route.query)
            .then(() => {})
            .catch(() => {});
        })
        .catch(error => {
          this.$toasted.error(error.response.data.message, {
            theme: "bubble",
            position: "top-right",
            duration: 3000
          });
        });
    }
  }
};
</script>
