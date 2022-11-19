import { defineStore } from "pinia";
import clients from "@/data/clients.json";
export const useUserStore = defineStore("UserStore", {
  state: () => ({
    clients,
  }),
  getters: {
    clientsCount(state) {
      return state.clients.length;
    },
  },
  actions: {
    async getClientsAction() {},
  },
});
