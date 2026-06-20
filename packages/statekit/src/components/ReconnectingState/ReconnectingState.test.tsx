import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ReconnectingState } from "./ReconnectingState";

describe("ReconnectingState", () => {
  it("shows a generic message with no nextRetryIn", () => {
    render(<ReconnectingState />);
    expect(screen.getByRole("status")).toHaveTextContent("Trying to restore your connection.");
  });

  it("shows the attempt and countdown when nextRetryIn is given", () => {
    render(<ReconnectingState attempt={2} nextRetryIn={5} />);
    expect(screen.getByRole("status")).toHaveTextContent("Attempt 2 — retrying in 5 seconds.");
  });
});
