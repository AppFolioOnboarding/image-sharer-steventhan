import React from "react";
import { mount, shallow, ReactWrapper } from "enzyme";
import FormHelperText from "@material-ui/core/FormHelperText";
import axios from "axios";
import { act } from "react-dom/test-utils";
import { StaticRouter } from "react-router-dom";

import * as hooks from "../hooks";
import ImageLinkForm from "./ImageLinkForm";

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
  shallow(<ImageLinkForm />);
});

describe("Form", () => {
  let wrapper: ReactWrapper;
  let uploadButton: ReactWrapper;

  beforeAll(() => {
    wrapper = mount(
      <StaticRouter location="/view/100">
        <ImageLinkForm />
      </StaticRouter>
    );
    uploadButton = wrapper.find("button#uploadButton");
  });

  it("should contains required elements", () => {
    const input = wrapper.find("input#imageLink");
    expect(wrapper.find("form").length).toBe(1);
    expect(input.length).toBe(1);
    expect(uploadButton.length).toBe(1);
  });

  it("should update input as user types", () => {
    const input = wrapper.find("input#imageLink");
    const useStateWithCheckSpy = jest.spyOn(hooks, "useStateWithCheck");
    const value = "hello";
    input.simulate("change", { target: { value } });
    expect(useStateWithCheckSpy).toBeCalledTimes(1);
    expect(useStateWithCheckSpy).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(Function)
    );
    wrapper.update();
    expect(wrapper.find("input#imageLink").length).toBe(1);
    expect(wrapper.find("input#imageLink").props().value).toBe(value);
  });

  it("should show error and disable submit button if input is not valid", () => {
    const input = wrapper.find("input#imageLink");
    const value = "an invalid link";
    input.simulate("change", { target: { value } });
    wrapper.update();

    const helperText = wrapper.find(FormHelperText);
    expect(helperText.length).toBe(1);
    expect(helperText.find("p").text()).toBe("Invalid link format");

    const uploadButton = wrapper.find("button#uploadButton");
    expect(uploadButton.props().disabled).toBe(true);
  });

  it("should hide error element and enable submit button if input is valid", () => {
    const input = wrapper.find("input#imageLink");
    const value = "https://google.com";
    input.simulate("change", { target: { value } });
    wrapper.update();
    expect(wrapper.find(FormHelperText).length).toBe(0);
    const uploadButton = wrapper.find("button#uploadButton");
    expect(uploadButton.props().disabled).toBe(false);
  });

  it("should show error element if submission returns error", async () => {
    const message = "Something went wrong";
    axiosMock.post.mockRejectedValueOnce({
      response: { data: { message } },
    });
    const input = wrapper.find("input#imageLink");
    const value = "https://google.com";
    input.simulate("change", { target: { value } });
    wrapper.update();
    const form = wrapper.find("form");
    await act(async () => {
      form.simulate("submit");
    });
    wrapper.update();
    expect(axiosMock.post).toBeCalledTimes(1);
    const helperText = wrapper.find(FormHelperText);
    expect(helperText.length).toBe(1);
    expect(helperText.find("p").text()).toBe(message);
  });

  it("should redirect to <ImageView /> submission goes thru", async () => {
    const location = "/view/16";
    axiosMock.post.mockResolvedValueOnce({
      data: { location },
    });
    const input = wrapper.find("input#imageLink");
    const value = "https://google.com";
    input.simulate("change", { target: { value } });
    wrapper.update();
    const form = wrapper.find("form");
    await act(async () => {
      form.simulate("submit");
    });
    expect(mockHistoryPush).toHaveBeenCalledWith(location);
  });
});
