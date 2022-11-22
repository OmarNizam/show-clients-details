<template>
  <main class="hello">
    <section id="search-section" class="container">
      <div class="row pb-5">
        <div class="col-lg-8 offset-lg-2 text-center">
          <div class="search">
            <h2>Context Labs</h2>
            <p>1205+ Clients has been added last month</p>
            <ion-icon name="search-outline"></ion-icon>
            <input
              type="search"
              placeholder="Search Clients"
              v-model="search"
            />
          </div>
        </div>
      </div>
    </section>
    <PopUp
      :client-data="clientData"
      @close-pop-up="closePopUp"
      v-if="popUpTrigger"
    >
    </PopUp>

    <!-- Desktop -->
    <section
      id="clients-desktop"
      class="container d-none d-md-block bg-light mt-3"
    >
      <div class="d-flex w-100 justify-content-between px-4">
        <h4 scope="col" class="col-4 align-middle">Avatar</h4>
        <h4 scope="col" class="col-4 align-middle">Name</h4>
        <h4 scope="col" class="col-4 align-middle">Title</h4>
      </div>
      <table width="100%">
        <tbody class="list-group">
          <tr
            v-for="client in filteredClients"
            @click="
              getChosenClient(client);
              openPopUp();
            "
            class="list-group-item list-group-item-action d-flex w-100 justify-content-between"
            :key="client.name"
          >
            <td class="col-4 align-middle align-text-bottom">
              <img :src="client.avatar" class="avatar-list ms-3" alt="avatar" />
            </td>

            <td scope="row" class="col-4 align-middle align-text-bottom">
              {{ containsHTML(client.name) }}
            </td>
            <td class="col-4 align-middle">{{ client.title }}</td>
          </tr>
        </tbody>
      </table>
    </section>
    <!-- tablet -->
    <div class="d-md-none d-sm-block">
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
@import url("./ClientsList.scss");
</style>
