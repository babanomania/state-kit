import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SessionExpiredState } from "./SessionExpiredState";

describe("SessionExpiredState", () => {
  it("renders modal-variant copy by default", () => {
    render(<SessionExpiredState onReauth={vi.fn()} />);
    expect(screen.getByRole("alert")).toHaveTextContent("Session expired");
  });

  it("renders inline-variant copy", () => {
    render(<SessionExpiredState onReauth={vi.fn()} variant="inline" />);
    expect(screen.getByRole("alert")).toHaveTextContent("You've been signed out");
  });

  it("fires onReauth when signing in", () => {
    const onReauth = vi.fn();
    render(<SessionExpiredState onReauth={onReauth} />);
    screen.getByRole("button", { name: "Sign in" }).click();
    expect(onReauth).toHaveBeenCalledTimes(1);
  });

  it("moves focus to the sign-in button on mount", () => {
    render(<SessionExpiredState onReauth={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Sign in" })).toHaveFocus();
  });
});
