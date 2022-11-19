<template>
  <div class="hello">
    <p>{{ clients }}</p>

    <p>{{ clientsNames }}</p>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useUserStore } from "@/stores/UserStore";

export default {
  name: "UsersList",
  props: {},
  data() {
    return {
      clientsNames: [],
    };
  },
  computed: {
    ...mapState(useUserStore, ["clients"]),
  },
  async created() {
    this.getClientName();
  },
  async mounted() {},
  methods: {
    getClientName() {
      for (const client of this.clients) {
        console.log(client.name);
        this.clientsNames.push(client.name);
      }
    },
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
