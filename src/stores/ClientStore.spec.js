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
      //GIVEN
      const store = useClientStore();
      //THEN
      expect(store.clients).toEqual([]);
    });

    test("Pinia store state: clients is array of objects", () => {
      //GIVEN
      const store = useClientStore();
      //WHEN
      store.$patch({
        clients: [clientsJson[0]],
      });
      //THEN
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
      //GIVEN
      const store = useClientStore();
      //THEN
      expect(store.clientsCount).toEqual(0);
    });

    test("Pinia store getters: clientsCount getter to return 1", () => {
      //GIVEN
      const store = useClientStore();
      //WHEN
      store.$patch({
        clients: [clientsJson[0]],
      });
      //THEN
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
      //GIVEN
      const store = useClientStore();
      const spy = jest
        .spyOn(store, "getClientsList")
        .mockImplementation(async () => {
          try {
            await Promise.resolve([clientsJson[0]], {
              status: 201,
              ok: true,
            });
          } catch (err) {
            return err;
          }
        });
      //WHEN
      await store.getClientsList(store.$patch({ clients: [clientsJson[0]] }));
      //THEN
      expect(spy).toHaveBeenCalled();
      expect(spy.mockImplementation.length).toBe(1);
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

    test("Pinia store actions: getClientsList action reject in get clients data", async () => {
      //GIVEN
      const store = useClientStore();
      const spy = jest
        .spyOn(store, "getClientsList")
        .mockImplementation(async () => {
          try {
            await Promise.reject("Error Text: Not Found!", {
              status: 404,
              ok: false,
            });
          } catch (err) {
            return err;
          }
        });
      //WHEN
      const errorStatus = await store.getClientsList();
      //THEN
      expect(spy).toHaveBeenCalled();
      expect(errorStatus).toBe("Error Text: Not Found!");
    });
  });
});

/**
 * actions unit test ends
 */
