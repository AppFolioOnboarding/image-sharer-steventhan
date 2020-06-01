import React from 'react';
import { mount } from "enzyme";
import NotFound from "./NotFound";


test("renders without crashing", () => {
  const wrapper = mount(<NotFound />);
  const h2 = wrapper.find("h2");
  expect(h2.length).toBe(1);
  expect(h2.text()).toBe("Not found");
})
