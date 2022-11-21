import { shallowMount } from "@vue/test-utils";
import { setActivePinia, createPinia } from "pinia";

import { createTestingPinia } from "@pinia/testing";

import ClientsList from "@/views/ClientsList/ClientsList.vue";
import PopUp from "@/components/Popup/PopUp.vue";
import { useClientStore } from "@/stores/ClientStore";

import clientsJson from "../../data/clients.json";

describe("ClientsList view:", () => {
  const wrapper = shallowMount(ClientsList, {
    components: {
      PopUp,
    },
    global: {
      plugins: [createTestingPinia()],
    },
  });

  beforeEach(() => {
    setActivePinia(createPinia());
  });

  afterEach(() => {
    wrapper.unmount();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  test("Should Load component and test initial state", () => {
    const store = useClientStore();

    expect(wrapper.exists).toBeTruthy();
    expect(store.clients).toEqual([]);
  });

  test("Should computed filteredClients", () => {
    const filteredClients = ClientsList.computed.filteredClients.call({
      clients: [clientsJson[0]],
    });

    expect(filteredClients).toEqual([
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
