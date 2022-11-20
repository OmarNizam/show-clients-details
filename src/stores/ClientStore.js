import { defineStore } from "pinia";
import clients from "@/data/clients.json";
export const useClientStore = defineStore("ClientStore", {
  state: () => ({
    clients: [],
  }),
  getters: {
    clientsCount(state) {
      return state.clients.length;
    },
  },
  actions: {
    async getClientsList() {
      try {
        this.clients = await clients;
      } catch (err) {
        console.log(`${err}`);
      }
    },
  },
});
