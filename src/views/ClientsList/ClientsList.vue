<template>
  <main class="hello">
    <div>
      <input type="search" v-model="search" />
    </div>
    <PopUp
      :client-data="clientData"
      @close-pop-up="closePopUp"
      v-if="popUpTrigger"
    >
      <h2>My Popup</h2>
    </PopUp>
    <!-- Desktop -->
    <div class="board" v-if="!mobile">
      <table width="100%">
        <thead>
          <tr>
            <td>Avatar</td>
            <td>Name</td>
            <td>Title</td>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="client in filteredClients"
            @click="
              getChosenClient(client);
              openPopUp();
            "
            class="clients-list"
            :key="client.name"
          >
            <img :src="client.avatar" class="avatar-list" alt="avatar" />
            <th scope="row">{{ containsHTML(client.name) }}</th>
            <td>{{ client.title }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- tablet -->
    <div v-if="mobile">
      <div
        v-for="client in filteredClients"
        class="clients-list"
        :key="client.name"
      >
        <div
          class="client-card"
          @click="
            getChosenClient(client);
            openPopUp();
          "
        >
          <img :src="client.avatar" class="avatar-list" alt="" />

          <div>{{ containsHTML(client.name) }}</div>
          <div>
            {{ client.title }}
          </div>
        </div>
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
      mobile: false,
    };
  },
  computed: {
    ...mapState(useClientStore, ["clients", "clientsCount"]),

    filteredClients() {
      return this.clients.filter((client) =>
        this.clientsCount
          ? Object.keys(this.clients[0]).some((key) =>
              ("" + client[key]).toLowerCase()?.includes(this.search)
            )
          : true
      );
    },
  },
  async created() {},
  async mounted() {
    await this.getClientsList();
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

    containsHTML: (str) => {
      return !/<[a-z][\s\S]*>/i.test(str)
        ? str
        : `${str.replace(/<[a-z][\s\S]*>/i, "")}`;
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

.avatar-list {
  height: 50px;
}

.clients-list {
  padding-top: 20px;
}
.client-card {
  border: 3px;
  border-block-color: black;
}
</style>
