import { shallowMount } from "@vue/test-utils";
import { setActivePinia, createPinia } from "pinia";

import { createTestingPinia } from "@pinia/testing";

import PopUp from "./PopUp.vue";

describe("The App:", () => {
  const wrapper = shallowMount(PopUp, {
    props: {
      clientData: {
        name: "Mithali Raj",
        title: "Data Scientist",
        avatar:
          "https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight2&accessoriesType=Round&hairColor=BrownDark&facialHairType=Blank&clotheType=ShirtCrewNeck&clotheColor=Blue03&eyeType=EyeRoll&eyebrowType=FlatNatural&mouthType=Tongue&skinColor=Tanned",
        quote: 'Here I go scraping "again"',
        nationality: "India",
      },
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

  test("Test checkClientValues method with name as parameter", () => {
    const spy = jest.spyOn(wrapper.vm, "checkClientValues");

    const name = wrapper.vm.checkClientValues("name");

    expect(spy).toHaveBeenCalled();
    expect(wrapper.vm.clientData).toEqual({
      avatar:
        "https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight2&accessoriesType=Round&hairColor=BrownDark&facialHairType=Blank&clotheType=ShirtCrewNeck&clotheColor=Blue03&eyeType=EyeRoll&eyebrowType=FlatNatural&mouthType=Tongue&skinColor=Tanned",
      name: "Mithali Raj",
      nationality: "India",
      quote: 'Here I go scraping "again"',
      title: "Data Scientist",
    });
    expect(name).toBe("Mithali Raj");
  });

  test("Test checkClientValues method with title as parameter", () => {
    const spy = jest.spyOn(wrapper.vm, "checkClientValues");

    const title = wrapper.vm.checkClientValues("title");

    expect(spy).toHaveBeenCalled();
    expect(wrapper.vm.clientData).toEqual({
      avatar:
        "https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight2&accessoriesType=Round&hairColor=BrownDark&facialHairType=Blank&clotheType=ShirtCrewNeck&clotheColor=Blue03&eyeType=EyeRoll&eyebrowType=FlatNatural&mouthType=Tongue&skinColor=Tanned",
      name: "Mithali Raj",
      nationality: "India",
      quote: 'Here I go scraping "again"',
      title: "Data Scientist",
    });
    expect(title).toBe("Data Scientist");
  });

  test("Test checkClientValues method with nationality as parameter", () => {
    const spy = jest.spyOn(wrapper.vm, "checkClientValues");

    const nationality = wrapper.vm.checkClientValues("nationality");

    expect(spy).toHaveBeenCalled();
    expect(wrapper.vm.clientData).toEqual({
      avatar:
        "https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight2&accessoriesType=Round&hairColor=BrownDark&facialHairType=Blank&clotheType=ShirtCrewNeck&clotheColor=Blue03&eyeType=EyeRoll&eyebrowType=FlatNatural&mouthType=Tongue&skinColor=Tanned",
      name: "Mithali Raj",
      nationality: "India",
      quote: 'Here I go scraping "again"',
      title: "Data Scientist",
    });
    expect(nationality).toBe("India");
  });

  test("Test checkClientValues method with quote as parameter", () => {
    const spy = jest.spyOn(wrapper.vm, "checkClientValues");

    const quote = wrapper.vm.checkClientValues("quote");

    expect(spy).toHaveBeenCalled();
    expect(wrapper.vm.clientData).toEqual({
      avatar:
        "https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight2&accessoriesType=Round&hairColor=BrownDark&facialHairType=Blank&clotheType=ShirtCrewNeck&clotheColor=Blue03&eyeType=EyeRoll&eyebrowType=FlatNatural&mouthType=Tongue&skinColor=Tanned",
      name: "Mithali Raj",
      nationality: "India",
      quote: 'Here I go scraping "again"',
      title: "Data Scientist",
    });
    expect(quote).toBe('Here I go scraping "again"');
  });

  test("Test containsHTML method", () => {
    const spy = jest.spyOn(wrapper.vm, "containsHTML");
    const str = "Omar <h1>TM</h1>";

    const newStr = wrapper.vm.containsHTML(str);

    expect(spy).toHaveBeenCalled();
    expect(newStr).toBe("Omar ");
  });

  test("Test closePopUp method", () => {
    const spy = jest.spyOn(wrapper.vm, "closePopUp");

    wrapper.vm.closePopUp();

    expect(spy).toHaveBeenCalled();
  });
});
