<template>
  <v-simple-table class="mt-2">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Type
          </th>
          <th class="text-left">
            Actions
          </th>
        </tr>
      </thead>
      <tbody v-if="sourcesList.length">
        <tr v-for="item in sourcesList" :key="item._id">
          <td>{{ item.name }}</td>
          <td>{{ item.type }}</td>
          <td v-if="!item.isDefault" class="d-flex text-center align-center">
            <Edit :formData="item" />
            <div class="ml-2">
              <v-btn x-small color="error" dark @click="deleteSource(item._id)">
                Delete
              </v-btn>
            </div>
          </td>
          <td v-else>-</td>
        </tr>
      </tbody>
      <div class="m-5 text-center" v-else>
        No Records Found
      </div>
    </template>
  </v-simple-table>
</template>

<script>
import Edit from "@/components/Sources/Edit/index.vue";

export default {
  components: {
    Edit
  },
  data() {
    return {};
  },
  computed: {
    sourcesList() {
      return this.$store.state.sourcesList;
    }
  },
  methods: {
    deleteSource(id) {
      this.$store
        .dispatch("deleteSource", id)
        .then(() => {
          this.$toasted.success("Source deleted successfully", {
            theme: "bubble",
            position: "top-right",
            duration: 3000
          });

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
