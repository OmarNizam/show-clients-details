import { shallowMount } from "@vue/test-utils";
import ClientsList from "./ClientsList.vue";

describe("ClientsList.vue", () => {
  test.skip("renders props.msg when passed", () => {
    const wrapper = shallowMount(ClientsList, {
      // props: { msg },
    });
    expect(wrapper.exists()).toBe("");
  });
});
