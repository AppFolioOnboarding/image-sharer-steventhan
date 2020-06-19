import React from "react";
import { mount, shallow } from "enzyme";
import Image from "./Image";
import Chip from "@material-ui/core/Chip";
import { StaticRouter } from "react-router-dom";

test("renders without crashing", () => {
  shallow(
    <Image
      imageData={{ id: 1, full_url: "test", location: "test", tag_list: [] }}
    />
  );
});

test("renders correct info", () => {
  const tags = ["tag1", "tag2"];
  const wrapper = mount(
    <StaticRouter>
      <Image
        imageData={{
          id: 1,
          full_url: "testsrc",
          location: "/testloc",
          tag_list: tags
        }}
      />
    </StaticRouter>
  );
  expect(wrapper.find("img").prop("src")).toBe("testsrc");
  expect(wrapper.find("a").prop("href")).toBe("/testloc");
  expect(wrapper.find(Chip).length).toBe(2);
  expect(wrapper.find(Chip).map(w => w.text())).toStrictEqual(tags);
});
