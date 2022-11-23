<template>
  <div class="d-flex justify-content-center py-5">
    <div class="col-lg-6 col-md-7">
      <h2>Context Labs</h2>
      <p>Clients has been added last month</p>
      <div class="wrapper">
        <img class="search-icon" src="../../assets/images/search-outline.svg" />
        <input
          class="search"
          type="search"
          placeholder=" Search Clients ..."
          v-model="searchText"
          @input="handleChange"
        />
        <a href="#">
          <img
            class="voice"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Google_mic.svg/716px-Google_mic.svg.png"
            title="Search by Voice"
          />
        </a>
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
