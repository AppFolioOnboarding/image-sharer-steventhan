import React from "react";
import { mount } from "enzyme";
import App from "./App";
import ImageLinkForm from "./components/ImageLinkForm";
import ImageIndex from "./components/ImageIndex";
import { act, render } from "@testing-library/react";
import axios from "axios";

jest.mock("axios");
const mockAxios = axios as jest.Mocked<typeof axios>;

test("app renders correctly", async () => {
  await act(async () => {
    render(<App />);
  });
});

test("contains <ImageLinkForm /> and <ImageIndex />", async () => {
  mockAxios.get.mockResolvedValueOnce({
    data: []
  });
  await act(async () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(ImageLinkForm).exists()).toBe(true);
    expect(wrapper.find(ImageIndex).exists()).toBe(true);
  });
});
