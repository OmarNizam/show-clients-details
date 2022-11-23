import { shallowMount } from "@vue/test-utils";
import { setActivePinia, createPinia } from "pinia";

import { createTestingPinia } from "@pinia/testing";

import App from "./App.vue";
import ClientsList from "./views/ClientsList/ClientsList.vue";

describe("The App:", () => {
  const wrapper = shallowMount(App, {
    components: {
      ClientsList,
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

  test("Should Load component", () => {
    expect(wrapper.exists).toBeTruthy();
  });
});
