import { shallowMount } from "@vue/test-utils";
import { setActivePinia, createPinia } from "pinia";

import { createTestingPinia } from "@pinia/testing";

import SearchBar from "./SearchBar.vue";

describe("The App:", () => {
  const wrapper = shallowMount(SearchBar, {
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
    //THEN
    expect(wrapper.exists).toBeTruthy();
  });

  test("Test handleChange method", () => {
    //GIVEN
    const spy = jest.spyOn(wrapper.vm, "handleChange");
    wrapper.vm.searchText = "text";
    //WHEN
    wrapper.vm.handleChange();
    //THEN
    expect(spy).toHaveBeenCalled();
    expect(wrapper.vm.searchText).toBe("text");
  });
});
