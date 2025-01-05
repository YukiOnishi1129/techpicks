import { describe } from "node:test";

import { expect, test } from "vitest";

import { formatDate, getDayjsTz } from "./date";

describe("date", () => {
  test("Success: format data", async () => {
    const date = getDayjsTz("2021-10-01T21:00:00+09:00");
    expect(formatDate(date)).toBe("2021/10/01 21:00:00");
  });
});
