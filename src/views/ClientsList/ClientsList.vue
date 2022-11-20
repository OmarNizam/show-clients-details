<template>
  <main class="hello">
    <input type="search" v-model="search" />
    <PopUp
      :client-data="clientData"
      @close-pop-up="closePopUp"
      v-if="popUpTrigger"
    >
      <h2>My Popup</h2>
    </PopUp>
    <div v-for="entry in filteredData" :key="entry.name">
      <div
        @click="
          getChosenClient(entry);
          openPopUp();
        "
      >
        {{ entry.name }}
        {{ entry.title }}
      </div>
    </div>
  </main>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useClientStore } from "@/stores/ClientStore";
import PopUp from "@/components/Popup/PopUp.vue";

export default {
  name: "ClientsList",
  components: {
    PopUp,
  },
  data() {
    return {
      search: "",
      popUpTrigger: false,
      clientData: {},
    };
  },
  computed: {
    ...mapState(useClientStore, ["clients", "clientsCount"]),

    filteredData() {
      return this.clients.filter((entry) =>
        this.clientsCount
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

    openPopUp() {
      this.popUpTrigger = !this.popUpTrigger;
    },
    closePopUp(newPopUpTrigger) {
      this.popUpTrigger = newPopUpTrigger;
    },
    getChosenClient(chosenClient) {
      this.clientData = chosenClient;
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
