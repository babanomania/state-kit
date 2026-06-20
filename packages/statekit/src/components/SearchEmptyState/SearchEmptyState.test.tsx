import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SearchEmptyState } from "./SearchEmptyState";

describe("SearchEmptyState", () => {
  it("echoes the query in the title", () => {
    render(<SearchEmptyState query="revenue" />);
    expect(screen.getByText('No results for "revenue"')).toBeInTheDocument();
    expect(screen.getByText("Try a broader term or check your spelling.")).toBeInTheDocument();
  });

  it("lists suggestions and fires onClear", () => {
    const onClear = vi.fn();
    render(<SearchEmptyState query="revenue" suggestions={["quarterly", "income", "ARR"]} onClear={onClear} />);
    expect(screen.getByText("Try: quarterly · income · ARR")).toBeInTheDocument();
    screen.getByRole("button", { name: "Clear search" }).click();
    expect(onClear).toHaveBeenCalledOnce();
  });
});
