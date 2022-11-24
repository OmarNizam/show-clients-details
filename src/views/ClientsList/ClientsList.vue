<template>
  <main class="hello">
    <section id="search-section" class="container">
      <SearchBar @handle-change="handleChange" />
    </section>
    <section id="popup-section">
      <PopUp
        :client-data="clientData"
        @close-pop-up="closePopUp"
        v-if="popUpTrigger"
      >
      </PopUp>
    </section>
    <section id="clients-list-section">
      <!-- Desktop -->
      <div id="clients-desktop" class="container d-none d-md-block mt-3">
        <div class="d-flex w-100 justify-content-between px-4">
          <h4 scope="col" class="col-4 align-middle text-white">Avatar</h4>
          <h4 scope="col" class="col-4 align-middle text-white">Name</h4>
          <h4 scope="col" class="col-4 align-middle text-white">Title</h4>
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
              <td class="col-4 d-flex flex-column justify-content-center">
                <img :src="client.avatar" class="avatar-list" alt="avatar" />
              </td>

              <td
                scope="row"
                class="col-4 d-flex flex-column justify-content-center"
              >
                {{ containsHTML(client.name) }}
              </td>
              <td class="col-4 d-flex flex-column justify-content-center">
                {{ client.title }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- tablet -->
      <div class="d-md-none d-sm-block">
        <div
          v-for="client in filteredClients"
          class="d-flex flex-column px-5 pb-4"
          :key="client.name"
        >
          <div
            class="card client-card"
            style="height: 170px"
            @click="
              getChosenClient(client);
              openPopUp();
            "
          >
            <img :src="client.avatar" class="avatar-list mt-2" alt="avatar" />
            <div class="pt-3">
              <strong>Name: </strong>{{ containsHTML(client.name) }}
            </div>
            <div class="pt-3">
              <strong>Job Title: </strong>
              {{ client.title }}
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useClientStore } from "@/stores/ClientStore";
import SearchBar from "@/components/SearchBar/SearchBar.vue";
import PopUp from "@/components/Popup/PopUp.vue";

export default {
  name: "ClientsList",
  components: {
    PopUp,
    SearchBar,
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

    handleChange(searchText) {
      this.search = searchText;
    },

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
