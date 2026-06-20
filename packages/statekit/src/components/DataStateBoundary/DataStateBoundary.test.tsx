import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { DataStateBoundary } from "./DataStateBoundary";

describe("DataStateBoundary", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders a spinner while loading", () => {
    render(
      <DataStateBoundary loading data={[1, 2, 3]}>
        <div>Users table</div>
      </DataStateBoundary>,
    );
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.queryByText("Users table")).not.toBeInTheDocument();
  });

  it("renders the default error state and fires onRetry", () => {
    const onRetry = vi.fn();
    render(
      <DataStateBoundary error={new Error("boom")} onRetry={onRetry}>
        <div>Users table</div>
      </DataStateBoundary>,
    );
    expect(screen.getByRole("alert")).toBeInTheDocument();
    screen.getByRole("button", { name: "Try again" }).click();
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("renders the default empty state for an empty array", () => {
    render(
      <DataStateBoundary data={[]}>
        {() => <div>Users table</div>}
      </DataStateBoundary>,
    );
    expect(screen.getByText("Nothing here yet")).toBeInTheDocument();
  });

  it("renders children with data when not loading, errored, empty, or offline", () => {
    render(
      <DataStateBoundary data={[1, 2, 3]}>{(data) => <div>{data.length} users</div>}</DataStateBoundary>,
    );
    expect(screen.getByText("3 users")).toBeInTheDocument();
  });

  it("renders OfflineState once it detects the browser is offline", () => {
    vi.useFakeTimers();
    vi.spyOn(window.navigator, "onLine", "get").mockReturnValue(false);

    render(
      <DataStateBoundary data={[1, 2, 3]}>
        <div>Users table</div>
      </DataStateBoundary>,
    );

    act(() => {
      vi.runAllTimers();
    });

    expect(screen.getByRole("alert")).toHaveTextContent("You're offline");
  });
});
