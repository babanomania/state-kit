import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ServerErrorState } from "./ServerErrorState";

describe("ServerErrorState", () => {
  it("shows the 500 copy by default", () => {
    render(<ServerErrorState />);
    expect(screen.getByRole("alert")).toHaveTextContent("Server error · 500");
  });

  it("shows the 503 copy and a status page link", () => {
    render(<ServerErrorState status={503} statusPageUrl="/status" retry={() => {}} />);
    expect(screen.getByRole("alert")).toHaveTextContent("Service unavailable · 503");
    expect(screen.getByRole("link", { name: "Status page" })).toHaveAttribute("href", "/status");
    expect(screen.getByRole("button", { name: "Reload" })).toBeInTheDocument();
  });
});
