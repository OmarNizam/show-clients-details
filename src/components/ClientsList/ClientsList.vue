<template>
  <div class="hello">
    <p>{{ clients }}</p>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useClientStore } from "@/stores/ClientStore";

export default {
  name: "ClientsList",
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapState(useClientStore, ["clients"]),
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
