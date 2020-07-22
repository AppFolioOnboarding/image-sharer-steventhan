import React from "react";
import { shallow } from "enzyme";
import FeedbackForm from "./FeedbackForm";
import { Button } from "@material-ui/core";

test("renders without crashing", () => {
  shallow(<FeedbackForm />);
});

test("has all the fields and button", () => {
  const wrapper = shallow(<FeedbackForm />);
  expect(wrapper.find(Button).length).toBe(2);
  expect(wrapper.find("#name").exists()).toBeTruthy();
  expect(wrapper.find("#comment").exists()).toBeTruthy();
  expect(wrapper.find("small").text()).toBe(
    "Copyright: Appfolio Inc. Onboarding"
  );
});
