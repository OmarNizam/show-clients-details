import { shallowMount } from "@vue/test-utils";
import UsersList from "@/components/UserList/UsersList.vue";

describe("UsersList.vue", () => {
  test("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(UsersList, {
      props: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
