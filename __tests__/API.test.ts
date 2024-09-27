// API.test.js
import { expect, test } from "vitest";
import { t } from "../index.js";
// import sampleTestCases from "./data.json";

const config = { colored: false };
const smapleTitle =
  ".removeAttr #p: Remove multiple attributes from paragraph ensuring the safety of the tag";
// const firstN = 5;

test("Test title should always span only 80 characters", () => {
  const title = t(smapleTitle, config);
  for (const eachLine of title.split("\n")) {
    expect(eachLine.length).toBe(80);
  }
});
