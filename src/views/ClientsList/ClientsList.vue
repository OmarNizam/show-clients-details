<template>
  <main class="hello">
    <div class="n1">
      <div class="search"></div>
      <input type="search" placeholder="Search" v-model="search" />
    </div>
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
      <table width="100%">
        <thead>
          <tr class="d-flex w-100 justify-content-between px-4">
            <td scope="col" class="col-4 align-middle">Avatar</td>
            <td scope="col" class="col-4 align-middle">Name</td>
            <td scope="col" class="col-4 align-middle">Title</td>
          </tr>
        </thead>
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

            <th scope="row" class="col-4 align-middle align-text-bottom">
              {{ containsHTML(client.name) }}
            </th>
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
