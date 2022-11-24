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
    //GIVEN
    const spy = jest.spyOn(wrapper.vm, "getClientsList");
    //WHEN
    await wrapper.vm.getClientsList();
    //THEN
    expect(spy).toHaveBeenCalled();
  });

  test("Test handleChange method", () => {
    //GIVEN
    const spy = jest.spyOn(wrapper.vm, "handleChange");
    const searchText = "omar";
    //WHEN
    wrapper.vm.handleChange(searchText);
    //THEN
    expect(spy).toHaveBeenCalledWith("omar");
    expect(wrapper.vm.search).toBe("omar");
  });

  test("Test openPopUp method", () => {
    //GIVEN
    const spy = jest.spyOn(wrapper.vm, "openPopUp");
    wrapper.vm.popUpTrigger = false;
    //WHEN
    wrapper.vm.openPopUp();
    //THEN
    expect(spy).toHaveBeenCalled();
    expect(wrapper.vm.popUpTrigger).toBeTruthy();
  });

  test("Test closePopUp method", () => {
    //GIVEN
    const spy = jest.spyOn(wrapper.vm, "closePopUp");
    const newPopUpTrigger = false;
    //WHEN
    wrapper.vm.closePopUp(newPopUpTrigger);
    //THEN
    expect(spy).toHaveBeenCalled();
    expect(wrapper.vm.popUpTrigger).toBeFalsy();
  });

  test("Test getChosenClient method", () => {
    //GIVEN
    const spy = jest.spyOn(wrapper.vm, "getChosenClient");
    const chosenClient = {
      avatar:
        "https://avataaars.io/?avatarStyle=Circle&topType=NoHair&accessoriesType=Blank&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=Hoodie&clotheColor=Gray01&eyeType=Surprised&eyebrowType=UpDown&mouthType=Twinkle&skinColor=Brown",
      name: "Brendon Taylor",
      nationality: "New Zealand",
      quote: "I am a super-visor!",
      title: "Supervisor",
    };
    //WHEN
    wrapper.vm.getChosenClient(chosenClient);
    //THEN
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
    //GIVEN
    const spy = jest.spyOn(wrapper.vm, "containsHTML");
    const str = "Omar <h1>TM</h1>";
    //WHEN
    const newStr = wrapper.vm.containsHTML(str);
    //THEN
    expect(spy).toHaveBeenCalled();
    expect(newStr).toBe("Omar ");
  });
});
