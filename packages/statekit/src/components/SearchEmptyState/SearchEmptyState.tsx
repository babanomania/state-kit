"use client";

import { InboxGlyph } from "../../icons";
import { ActionButton } from "../../primitives/Button";
import { StateLayout } from "../../primitives/StateLayout";
import { ThemeScope, type ThemeInput } from "../../theme/StateProvider";

export interface SearchEmptyStateProps {
  query: string;
  suggestions?: string[];
  onClear?: () => void;
  theme?: ThemeInput;
}

export function SearchEmptyState({ query, suggestions = [], onClear, theme }: SearchEmptyStateProps) {
  const description =
    suggestions.length > 0 ? `Try: ${suggestions.join(" · ")}` : "Try a broader term or check your spelling.";

  return (
    <ThemeScope theme={theme}>
      <StateLayout
        icon={<InboxGlyph />}
        title={`No results for "${query}"`}
        description={description}
        maxDescriptionWidth={320}
        action={onClear ? <ActionButton onClick={onClear}>Clear search</ActionButton> : undefined}
      />
    </ThemeScope>
  );
}
