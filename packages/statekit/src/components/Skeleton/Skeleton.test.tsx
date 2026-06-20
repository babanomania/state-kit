import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Skeleton } from "./Skeleton";

describe("Skeleton", () => {
  it("announces a polite loading status", () => {
    render(<Skeleton />);
    expect(screen.getByRole("status")).toHaveTextContent("Loading content");
  });

  it("renders compound children verbatim when provided", () => {
    render(
      <Skeleton>
        <Skeleton.Avatar />
        <Skeleton.Line width="75%" />
      </Skeleton>,
    );
    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});
