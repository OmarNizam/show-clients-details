import { shallowMount } from "@vue/test-utils";
import { setActivePinia, createPinia } from "pinia";

import { createTestingPinia } from "@pinia/testing";

import ClientsList from "@/views/ClientsList/ClientsList.vue";
import PopUp from "@/components/Popup/PopUp.vue";
import SearchBar from "@/components/SearchBar/SearchBar.vue";
import { useClientStore } from "@/stores/ClientStore";

import clientsJson from "../../data/clients.json";

describe("ClientsList view:", () => {
  const wrapper = shallowMount(ClientsList, {
    components: {
      PopUp,
      SearchBar,
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

  test("Test getClientsList pinia store action form component on mounted property", async () => {
    const spy = jest.spyOn(wrapper.vm, "getClientsList");

    await wrapper.vm.getClientsList();

    expect(spy).toHaveBeenCalled();
  });

  test("Test handleChange method", () => {
    const spy = jest.spyOn(wrapper.vm, "handleChange");
    const searchText = "omar";

    wrapper.vm.handleChange(searchText);

    expect(spy).toHaveBeenCalledWith("omar");
    expect(wrapper.vm.search).toBe("omar");
  });

  test("Test openPopUp method", () => {
    const spy = jest.spyOn(wrapper.vm, "openPopUp");
    wrapper.vm.popUpTrigger = false;

    wrapper.vm.openPopUp();

    expect(spy).toHaveBeenCalled();
    expect(wrapper.vm.popUpTrigger).toBeTruthy();
  });

  test("Test closePopUp method", () => {
    const spy = jest.spyOn(wrapper.vm, "closePopUp");
    const newPopUpTrigger = false;

    wrapper.vm.closePopUp(newPopUpTrigger);

    expect(spy).toHaveBeenCalled();
    expect(wrapper.vm.popUpTrigger).toBeFalsy();
  });

  test("Test getChosenClient method", () => {
    const spy = jest.spyOn(wrapper.vm, "getChosenClient");
    const chosenClient = {
      avatar:
        "https://avataaars.io/?avatarStyle=Circle&topType=NoHair&accessoriesType=Blank&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=Hoodie&clotheColor=Gray01&eyeType=Surprised&eyebrowType=UpDown&mouthType=Twinkle&skinColor=Brown",
      name: "Brendon Taylor",
      nationality: "New Zealand",
      quote: "I am a super-visor!",
      title: "Supervisor",
    };

    wrapper.vm.getChosenClient(chosenClient);

    expect(spy).toHaveBeenCalled();
    expect(wrapper.vm.clientData).toEqual({
      avatar:
        "https://avataaars.io/?avatarStyle=Circle&topType=NoHair&accessoriesType=Blank&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=Hoodie&clotheColor=Gray01&eyeType=Surprised&eyebrowType=UpDown&mouthType=Twinkle&skinColor=Brown",
      name: "Brendon Taylor",
      nationality: "New Zealand",
      quote: "I am a super-visor!",
      title: "Supervisor",
    });
  });

  test("Test containsHTML method", () => {
    const spy = jest.spyOn(wrapper.vm, "containsHTML");
    const str = "Omar <h1>TM</h1>";

    const newStr = wrapper.vm.containsHTML(str);

    expect(spy).toHaveBeenCalled();
    expect(newStr).toBe("Omar ");
  });
});
