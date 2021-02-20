<template>
  <div>Hello {{$store.state.user.name}}</div>
</template>

<script>
export default {
  watchQuery: true,
  middleware: "authenticated",
};
</script>
