import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { OfflineState } from "./OfflineState";

describe("OfflineState", () => {
  it("renders an alert with the offline message and signal bars", () => {
    render(<OfflineState />);
    expect(screen.getByRole("alert")).toHaveTextContent("You're offline");
  });

  it("omits the signal bars when showSignal is false", () => {
    const { container } = render(<OfflineState showSignal={false} />);
    expect(container.querySelector(".animate-sk-signal")).not.toBeInTheDocument();
  });
});
