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
});
