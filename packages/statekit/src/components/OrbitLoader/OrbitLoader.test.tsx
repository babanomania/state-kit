import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { OrbitLoader } from "./OrbitLoader";

describe("OrbitLoader", () => {
  it("announces a polite loading status", () => {
    render(<OrbitLoader />);
    expect(screen.getByRole("status")).toHaveTextContent("Loading");
  });

  it("renders only one ring for the single variant", () => {
    const { container } = render(<OrbitLoader variant="single" />);
    expect(container.querySelectorAll(".animate-sk-orbit-a-rev")).toHaveLength(0);
  });
});
