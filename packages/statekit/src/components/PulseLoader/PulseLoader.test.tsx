import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PulseLoader } from "./PulseLoader";

describe("PulseLoader", () => {
  it("announces a polite loading status", () => {
    render(<PulseLoader />);
    expect(screen.getByRole("status")).toHaveTextContent("Loading");
  });

  it("renders the requested dot count", () => {
    const { container } = render(<PulseLoader variant="dots" count={5} />);
    expect(container.querySelectorAll(".animate-sk-pulse")).toHaveLength(5);
  });
});
