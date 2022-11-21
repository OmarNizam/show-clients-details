<template>
  <ClientsList />
</template>

<script>
import ClientsList from "./views/ClientsList/ClientsList.vue";
export default {
  name: "App",
  components: {
    ClientsList,
  },
};
</script>

<style lang="scss">
@import url("./App.scss");
</style>
