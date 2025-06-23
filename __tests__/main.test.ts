import { jest, test } from "@jest/globals";
import * as core from "../__fixtures__/core.js";

jest.unstable_mockModule("@actions/core", () => core);

describe("main.ts", () => {
  test("Example", () => {
    expect(true).toBe(true);
  });
});
