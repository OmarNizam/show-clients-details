import { shallowMount } from "@vue/test-utils";
import ClientsList from "@/components/ClientsList/ClientsList.vue";

describe("ClientsList.vue", () => {
  test("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(ClientsList, {
      props: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
