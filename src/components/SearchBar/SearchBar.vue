<template>
  <div class="d-flex justify-content-center py-5">
    <div class="col-lg-5 col-md-7 pt-3 mx-5">
      <h3 class="text-white">ContextLabs</h3>
      <p class="text-white">1205 + Clients has been added last month</p>
      <div class="wrapper">
        <img class="search-icon" src="../../assets/images/search-outline.svg" />
        <input
          class="search"
          type="search"
          placeholder=" Search Clients ..."
          v-model="searchText"
          @input="handleChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      searchText: "",
    };
  },
  methods: {
    handleChange() {
      this.$emit("handleChange", this.searchText);
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("./SearchBar.scss");
</style>
