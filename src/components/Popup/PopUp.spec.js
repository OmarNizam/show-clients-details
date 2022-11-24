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
    //THEN
    expect(wrapper.exists).toBeTruthy();
  });

  test("Test checkClientValues method with name as parameter", () => {
    //GIVEN
    const spy = jest.spyOn(wrapper.vm, "checkClientValues");
    //WHEN
    const name = wrapper.vm.checkClientValues("name");
    //THEN
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
    //GIVEN
    const spy = jest.spyOn(wrapper.vm, "checkClientValues");
    //WHEN
    const title = wrapper.vm.checkClientValues("title");
    //THEN
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
    //GIVEN
    const spy = jest.spyOn(wrapper.vm, "checkClientValues");
    //WHEN
    const nationality = wrapper.vm.checkClientValues("nationality");
    //THEN
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
    //GIVEN
    const spy = jest.spyOn(wrapper.vm, "checkClientValues");
    //WHEN
    const quote = wrapper.vm.checkClientValues("quote");
    //THEN
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
    //GIVEN
    const spy = jest.spyOn(wrapper.vm, "containsHTML");
    const str = "Omar <h1>TM</h1>";
    //WHEN
    const newStr = wrapper.vm.containsHTML(str);
    //THEN
    expect(spy).toHaveBeenCalled();
    expect(newStr).toBe("Omar ");
  });

  test("Test closePopUp method", () => {
    //GIVEN
    const spy = jest.spyOn(wrapper.vm, "closePopUp");
    //WHEN
    wrapper.vm.closePopUp();
    //THEN
    expect(spy).toHaveBeenCalled();
  });
});
