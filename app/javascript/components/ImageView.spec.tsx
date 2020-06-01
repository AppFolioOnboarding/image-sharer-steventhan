import React from "react";
import { StaticRouter } from "react-router-dom";
import { mount, shallow, ReactWrapper } from "enzyme";
import axios from "axios";
import { act } from "react-dom/test-utils";
import { Link } from "react-router-dom"

import ImageView from "./ImageView";
import NotFound from "./NotFound";

jest.mock('axios');
const axiosMock = axios as jest.Mocked<typeof axios>;


test("renders without crashing", () => {
  shallow(
    <StaticRouter location="/view/100">
      <ImageView />
    </StaticRouter>
  );
});

test("updates after fetching img", async () => {
  const testUrl = "https://example.com";
  axiosMock.get.mockResolvedValueOnce({
    data: {
      full_url: testUrl
    }
  });
  let wrapper: ReactWrapper;
  await act(async () => {
    wrapper = mount(
      <StaticRouter location="/view/100">
        <ImageView />
      </StaticRouter>
    );
    const h2 = wrapper.find('h2');
    expect(h2.length).toBe(1);
    expect(h2.text()).toEqual('loading');
  });
  wrapper.update()
  expect(wrapper.find(Link).length).toBe(1);
  expect(wrapper.find("h2").text()).toContain(testUrl);
  expect(wrapper.find("img").prop("src")).toEqual(testUrl);
  expect(axiosMock.get).toBeCalledTimes(1);
});

test("renders <NotFound /> if api returns 404", async () => {
  axiosMock.get.mockRejectedValueOnce({
    response: { status: 404 }
  });
  let wrapper: ReactWrapper;
  await act(async () => {
    wrapper = await mount(
      <StaticRouter location="/view/100">
        <ImageView />
      </StaticRouter>
    );
    const h2 = wrapper.find('h2');
    expect(h2.length).toBe(1);
    expect(h2.text()).toEqual('loading');
  });
  wrapper.update();
  expect(wrapper.find(NotFound).length).toBe(1);
});