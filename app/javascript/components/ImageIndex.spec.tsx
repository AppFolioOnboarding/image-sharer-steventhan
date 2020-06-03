import React from "react";
import { mount, shallow, ReactWrapper } from "enzyme";
import ImageIndex from "./ImageIndex";
import Image from "./Image";
import { StaticRouter } from "react-router-dom";
import axios from "axios";
import { act } from "@testing-library/react";

jest.mock("axios");
const mockAxios = axios as jest.Mocked<typeof axios>;

test("renders without crashing", () => {
  shallow(
    <StaticRouter>
      <ImageIndex />
    </StaticRouter>
  );
});

test("renders images if request succeeds", async () => {
  mockAxios.get.mockResolvedValueOnce({
    data: [
      {
        id: 1,
        full_url: "test",
        tag_list: ["tags1", "tags2"],
        location: "test",
      },
      {
        id: 2,
        full_url: "test",
        tag_list: [],
        location: "test",
      },
    ],
  });
  let wrapper: ReactWrapper;
  await act(async () => {
    wrapper = mount(
      <StaticRouter>
        <ImageIndex />
      </StaticRouter>
    );
  });
  wrapper.update();
  expect(wrapper.find(Image).length).toBe(2);
});

test("renders error message if request succeeds", async () => {
  mockAxios.get.mockRejectedValueOnce({
    data: [
      {
        id: 1,
        full_url: "test",
        location: "test",
      },
      {
        id: 2,
        full_url: "test",
        location: "test",
      },
    ],
  });
  let wrapper: ReactWrapper;
  await act(async () => {
    wrapper = mount(
      <StaticRouter>
        <ImageIndex />
      </StaticRouter>
    );
  });
  wrapper.update();
  expect(wrapper.find('h2').exists()).toBe(true);
  expect(wrapper.find('h2').text()).toBe("Can't load");
});
