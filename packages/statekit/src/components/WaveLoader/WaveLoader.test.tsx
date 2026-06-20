import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { WaveLoader } from "./WaveLoader";

describe("WaveLoader", () => {
  it("announces a polite loading status", () => {
    render(<WaveLoader />);
    expect(screen.getByRole("status")).toHaveTextContent("Loading");
  });

  it("renders the requested bar count", () => {
    const { container } = render(<WaveLoader bars={7} />);
    expect(container.querySelectorAll(".animate-sk-bar")).toHaveLength(7);
  });
});
