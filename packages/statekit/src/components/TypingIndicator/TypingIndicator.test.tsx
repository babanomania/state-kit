import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TypingIndicator } from "./TypingIndicator";

describe("TypingIndicator", () => {
  it("announces the typing text", () => {
    render(<TypingIndicator text="Bot is typing" />);
    expect(screen.getByRole("status")).toHaveTextContent("Bot is typing");
  });

  it("renders nothing when inactive", () => {
    const { container } = render(<TypingIndicator active={false} />);
    expect(container).toBeEmptyDOMElement();
  });
});
