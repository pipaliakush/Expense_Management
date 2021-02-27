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
  sources(state, result) {
    state.sourcesList = result;
  },
  isLoading(state, value) {
    state.isLoading = value;
  },
  transactions(state, result) {
    state.transactionsList = result;
  },
  transaction(state, result) {
    state.singleTransactionList = result;
  }
};
