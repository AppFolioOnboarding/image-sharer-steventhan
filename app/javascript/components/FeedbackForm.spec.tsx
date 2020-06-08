import React from "react";
import { shallow, mount } from "enzyme";
import FeedbackForm from "./FeedbackForm";
import { Button, FormHelperText } from "@material-ui/core";
import { StaticRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import axios from "axios";

jest.mock("axios");
const axiosMock = axios as jest.Mocked<typeof axios>;
const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

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

test("validates fields", () => {
  const wrapper = mount(
    <StaticRouter>
      <FeedbackForm />
    </StaticRouter>
  );
  let button = wrapper.find("button#feedbackSubmit");
  expect(button.prop("disabled")).toBe(true);
  const name = wrapper.find("input#name");
  const comment = wrapper.find("textarea#comment");

  name.simulate("change", { target: { value: "name" } });
  wrapper.update();
  button = wrapper.find("button#feedbackSubmit");
  expect(button.prop("disabled")).toBe(true);
  name.simulate("change", { target: { value: "" } });
  comment.simulate("change", { target: { value: "comment" } });
  wrapper.update();
  button = wrapper.find("button#feedbackSubmit");
  expect(button.prop("disabled")).toBe(true);
  name.simulate("change", { target: { value: "name" } });
  comment.simulate("change", { target: { value: "comment" } });
  wrapper.update();
  button = wrapper.find("button#feedbackSubmit");
  expect(button.prop("disabled")).toBe(false);
});

test("submits successfully", async () => {
  axiosMock.post.mockResolvedValueOnce({});
  const wrapper = mount(
    <StaticRouter>
      <FeedbackForm />
    </StaticRouter>
  );
  const name = wrapper.find("input#name");
  const comment = wrapper.find("textarea#comment");

  name.simulate("change", { target: { value: "name" } });
  comment.simulate("change", { target: { value: "comment" } });
  wrapper.update();
  const button = wrapper.find("button#feedbackSubmit");
  expect(button.prop("disabled")).toBe(false);
  const form = wrapper.find("form");

  await act(async () => {
    form.simulate("submit");
  });
  wrapper.update();
  expect(wrapper.find("input#name").text()).toBe("");
  expect(wrapper.find("textarea#comment").text()).toBe("");
  const helperText = wrapper.find(FormHelperText);
  expect(helperText.length).toBe(1);
  expect(helperText.find("p").text()).toBe("Done");
});

test("submits unsuccessfully", async () => {
  const message = "Something went wrong";
  axiosMock.post.mockRejectedValueOnce({
    response: { data: { message } },
  });
  const wrapper = mount(
    <StaticRouter>
      <FeedbackForm />
    </StaticRouter>
  );
  const name = wrapper.find("input#name");
  const comment = wrapper.find("textarea#comment");

  name.simulate("change", { target: { value: "name" } });
  comment.simulate("change", { target: { value: "comment" } });
  wrapper.update();
  const button = wrapper.find("button#feedbackSubmit");
  expect(button.prop("disabled")).toBe(false);
  const form = wrapper.find("form");

  await act(async () => {
    form.simulate("submit");
  });
  wrapper.update();
  expect(wrapper.find("input#name").text()).toBe("");
  expect(wrapper.find("textarea#comment").text()).toBe("");
  const helperText = wrapper.find(FormHelperText);
  expect(helperText.length).toBe(1);
  expect(helperText.find("p").text()).toBe(message);
});