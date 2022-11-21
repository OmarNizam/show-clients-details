import { setActivePinia, createPinia } from "pinia";
import { useClientStore } from "./ClientStore";
import clientsJson from "../data/clients.json";

describe("Client Store:", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  /**
   * Store state unit tests
   */

  describe("Client store states:", () => {
    test("Pinia store state: clients is empty array", () => {
      const store = useClientStore();

      expect(store.clients).toEqual([]);
    });

    test("Pinia store state: clients is array of objects", () => {
      const store = useClientStore();

      store.$patch({
        clients: [clientsJson[0]],
      });

      expect(store.clients).toEqual([
        {
          avatar:
            "https://avataaars.io/?avatarStyle=Circle&topType=NoHair&accessoriesType=Blank&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=Hoodie&clotheColor=Gray01&eyeType=Surprised&eyebrowType=UpDown&mouthType=Twinkle&skinColor=Brown",
          name: "Brendon Taylor",
          nationality: "New Zealand",
          quote: "I am a super-visor!",
          title: "Supervisor",
        },
      ]);
    });
  });
  /**
   * state unit test ends
   */

  /**
   * getters unit test start
   */

  describe("Client store getters:", () => {
    test("Pinia store getters: clientsCount getter to return 0", () => {
      const store = useClientStore();

      expect(store.clientsCount).toEqual(0);
    });

    test("Pinia store getters: clientsCount getter to return 1", () => {
      const store = useClientStore();

      store.$patch({
        clients: [clientsJson[0]],
      });

      expect(store.clientsCount).toEqual(1);
    });
  });

  /**
   * state unit test ends
   */

  /**
   * actions unit test starts
   */

  describe("Client store actions:", () => {
    test("Pinia store actions: getClientsList action success to get clients data and patch the value to the state", async () => {
      const store = useClientStore();
      const spy = jest
        .spyOn(store, "getClientsList")
        .mockImplementation(() =>
          Promise.resolve([clientsJson[0]], { status: 201 })
        );

      store.getClientsList(
        store.$patch({
          clients: [clientsJson[0]],
        })
      );

      // ...but it's still wrapped with a spy, so you can inspect calls
      expect(spy).toHaveBeenCalledTimes(1);
      expect(store.clients).toEqual([
        {
          avatar:
            "https://avataaars.io/?avatarStyle=Circle&topType=NoHair&accessoriesType=Blank&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=Hoodie&clotheColor=Gray01&eyeType=Surprised&eyebrowType=UpDown&mouthType=Twinkle&skinColor=Brown",
          name: "Brendon Taylor",
          nationality: "New Zealand",
          quote: "I am a super-visor!",
          title: "Supervisor",
        },
      ]);
    });

    test("", () => {});
  });
});
