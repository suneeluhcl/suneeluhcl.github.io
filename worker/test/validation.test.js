import { describe, it, expect } from "vitest";
import { isAllowedOrigin, validateMessages } from "../src/lib/validation.js";

describe("isAllowedOrigin", () => {
  it("accepts the portfolio origins", () => {
    expect(isAllowedOrigin("https://suneelkumarbikkasani.com")).toBe(true);
    expect(isAllowedOrigin("http://localhost:5173")).toBe(true);
  });
  it("rejects foreign origins and null", () => {
    expect(isAllowedOrigin("https://evil.example")).toBe(false);
    expect(isAllowedOrigin(null)).toBe(false);
  });
});

describe("validateMessages", () => {
  it("accepts a well-formed user turn", () => {
    const r = validateMessages([{ role: "user", content: "Kafka experience?" }]);
    expect(r.ok).toBe(true);
    expect(r.messages).toHaveLength(1);
  });
  it("rejects non-arrays", () => {
    expect(validateMessages(null).ok).toBe(false);
    expect(validateMessages("nope").ok).toBe(false);
  });
  it("rejects empty and over-long input", () => {
    expect(validateMessages([]).ok).toBe(false);
    const long = "x".repeat(2001);
    expect(validateMessages([{ role: "user", content: long }]).ok).toBe(false);
  });
  it("rejects bad roles", () => {
    expect(validateMessages([{ role: "system", content: "hi" }]).ok).toBe(false);
  });
  it("rejects empty content", () => {
    expect(validateMessages([{ role: "user", content: "" }]).ok).toBe(false);
  });
  it("rejects too many messages", () => {
    const many = Array.from({ length: 21 }, () => ({ role: "user", content: "hi" }));
    expect(validateMessages(many).ok).toBe(false);
  });
});
