import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ValidationErrorState } from "./ValidationErrorState";

describe("ValidationErrorState", () => {
  it("announces the validation message as an alert tied to the field", () => {
    render(<ValidationErrorState field="email" message="Enter a valid email address" value="invalid@" />);
    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Enter a valid email address");
    const input = screen.getByDisplayValue("invalid@");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("id", "email");
  });
});
