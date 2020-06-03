import React from "react";
import { mount, shallow } from "enzyme";
import Image from "./Image";
import { StaticRouter } from "react-router-dom";

test("renders without crashing", () => {
  shallow(<Image imageData={{ id: 1, full_url: "test", location: "test" }} />);
});

test("renders correct info", () => {
  const wrapper = mount(
    <StaticRouter>
      <Image imageData={{ id: 1, full_url: "testsrc", location: "/testloc" }} />
    </StaticRouter>
  );
  expect(wrapper.find("img").prop("src")).toBe("testsrc");
  expect(wrapper.find("a").prop("href")).toBe("/testloc");
});
