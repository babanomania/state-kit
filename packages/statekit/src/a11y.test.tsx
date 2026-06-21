import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";
import { DashboardState } from "./components/DashboardState";
import { EmptyState } from "./components/EmptyState";
import { ErrorState } from "./components/ErrorState";
import { ProgressLoader } from "./components/ProgressLoader";
import { Spinner } from "./components/Spinner";
import { TableState } from "./components/TableState";
import { ValidationErrorState } from "./components/ValidationErrorState";

/**
 * Smoke-tests one representative component per ARIA pattern (status/alert/progressbar/plain) rather
 * than every component — the patterns repeat across the catalog, so this catches systemic a11y
 * regressions without retrofitting all 34 component test files.
 */
describe("accessibility (axe)", () => {
  it("Spinner (role=status) has no violations", async () => {
    const { container } = render(<Spinner />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("ProgressLoader (role=progressbar) has no violations", async () => {
    const { container } = render(<ProgressLoader variant="linear" value={50} />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("ErrorState (role=alert, with retry button) has no violations", async () => {
    const { container } = render(<ErrorState retry={() => {}} />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("EmptyState (no special role) has no violations", async () => {
    const { container } = render(<EmptyState title="No items yet" description="Add your first record" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("ValidationErrorState (aria-invalid input) has no violations", async () => {
    const { container } = render(<ValidationErrorState field="email" message="Enter a valid email address" value="invalid@" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("TableState (composite data surface) has no violations", async () => {
    const { container } = render(<TableState status="loading" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("DashboardState (per-widget failure isolation) has no violations", async () => {
    const { container } = render(
      <DashboardState
        widgets={[
          { id: "a", title: "Revenue", status: "ready" },
          { id: "b", title: "Conversion", status: "error" },
        ]}
      >
        {(w) => <div>{w.title}</div>}
      </DashboardState>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
