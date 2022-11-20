<template>
  <div class="hello">
    <input type="search" v-model="search" />
    <div v-for="entry in filteredData" :key="entry.name">
      <pre v-text="entry" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useClientStore } from "@/stores/ClientStore";

export default {
  name: "ClientsList",
  props: {},
  data() {
    return {
      search: "",
    };
  },
  computed: {
    ...mapState(useClientStore, ["clients"]),
    filteredData() {
      return this.clients.filter((entry) =>
        this.clients.length
          ? Object.keys(this.clients[0]).some((key) =>
              ("" + entry[key]).toLowerCase().includes(this.search)
            )
          : true
      );
    },
  },
  async created() {},
  async mounted() {
    this.getClientsList();
  },
  methods: {
    ...mapActions(useClientStore, ["getClientsList"]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
