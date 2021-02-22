export default {
  helloMutation(state, str) {
    state.hello = str;
  },
  setUser(state, value) {
    state.user = value;
  },
  categories(state, result) {
    state.categoriesList = result;
  },
  isLoading(state, value) {
    state.isLoading = value;
  }
};
