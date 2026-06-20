import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { createTheme } from "./createTheme";
import { StateProvider, ThemeScope, useTheme } from "./StateProvider";

function Probe({ localTheme }: { localTheme?: Parameters<typeof useTheme>[0] }) {
  const theme = useTheme(localTheme);
  return <span data-testid="probe">{theme.name}</span>;
}

describe("StateProvider", () => {
  it("defaults to aurora and exposes it via context", () => {
    render(
      <StateProvider>
        <Probe />
      </StateProvider>,
    );
    expect(screen.getByTestId("probe").textContent).toBe("aurora");
  });

  it("applies theme CSS vars to the scope element", () => {
    render(
      <StateProvider theme="neon">
        <span>child</span>
      </StateProvider>,
    );
    const scope = document.querySelector("[data-statekit-theme='neon']") as HTMLElement;
    expect(scope).not.toBeNull();
    expect(scope.style.getPropertyValue("--sk-accent")).toBe("#4fd6e0");
  });

  it("accepts a custom ThemeTokens object", () => {
    render(
      <StateProvider
        theme={{ accent: "#ff0000", surface: "#000000", border: "#111111", radius: 4, blur: 0, elevation: "flat" }}
      >
        <Probe />
      </StateProvider>,
    );
    expect(screen.getByTestId("probe").textContent).toBe("custom");
  });

  it("lets a per-component theme prop override the ambient provider", () => {
    render(
      <StateProvider theme="aurora">
        <Probe localTheme="enterprise" />
      </StateProvider>,
    );
    expect(screen.getByTestId("probe").textContent).toBe("enterprise");
  });

  it("ThemeScope only wraps in a new node when given a local override", () => {
    const { container } = render(
      <StateProvider theme="aurora">
        <ThemeScope>
          <span>no override</span>
        </ThemeScope>
      </StateProvider>,
    );
    expect(container.querySelectorAll("[data-statekit-theme]").length).toBe(1);
  });

  it("createTheme produces a Theme that StateProvider can consume directly", () => {
    const custom = createTheme(
      { accent: "#00ff00", surface: "#ffffff", border: "#cccccc", radius: 10, blur: 0, elevation: "soft" },
      "mint",
    );
    render(
      <StateProvider theme={custom}>
        <Probe />
      </StateProvider>,
    );
    expect(screen.getByTestId("probe").textContent).toBe("mint");
  });
});
