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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
