import { shallowMount } from "@vue/test-utils";
import { setActivePinia, createPinia } from "pinia";

import { createTestingPinia } from "@pinia/testing";

import ClientsList from "@/views/ClientsList/ClientsList.vue";
import PopUp from "@/components/Popup/PopUp.vue";
import { useClientStore } from "@/stores/ClientStore";

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
});
