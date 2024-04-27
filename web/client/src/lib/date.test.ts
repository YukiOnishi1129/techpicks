import { describe } from "node:test";

import { expect, test } from "vitest";

import {
  formatDate,
  getDateEndTime,
  getDateStartTime,
  getDayjsTz,
} from "./date";

describe("date", () => {
  describe("getDateStartTime", () => {
    test("Success: start time ", async () => {
      const want = "2021-10-01 00:00:00";
      const date = getDayjsTz("2021-10-01T12:00:00Z");

      const startOfDay = getDateStartTime(date);
      expect(startOfDay.format("YYYY-MM-DD HH:mm:ss")).toBe(want);
    });
  });
  test("Success: end time", async () => {
    const date = getDayjsTz("2021-10-01T12:00:00Z");
    const endOfDay = getDateEndTime(date);
    expect(endOfDay.format("YYYY-MM-DD HH:mm:ss")).toBe("2021-10-01 23:59:59");
  });
  test("Success: format data", async () => {
    const date = getDayjsTz("2021-10-01T21:00:00+09:00");
    expect(formatDate(date)).toBe("2021/10/01 21:00:00");
  });
});
