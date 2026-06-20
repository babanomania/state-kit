"use client";

import { InboxGlyph } from "../../icons";
import { ActionButton } from "../../primitives/Button";
import { StateLayout } from "../../primitives/StateLayout";
import { ThemeScope, type ThemeInput } from "../../theme/StateProvider";

export interface FilterEmptyStateProps {
  activeFilters?: number;
  onReset?: () => void;
  theme?: ThemeInput;
}

export function FilterEmptyState({ activeFilters = 0, onReset, theme }: FilterEmptyStateProps) {
  const description = onReset
    ? "Reset to see all records."
    : `${activeFilters} filter${activeFilters === 1 ? "" : "s"} are active.`;

  return (
    <ThemeScope theme={theme}>
      <StateLayout
        icon={<InboxGlyph />}
        title="Nothing matches these filters"
        description={description}
        action={onReset ? <ActionButton onClick={onReset}>Reset filters</ActionButton> : undefined}
      />
    </ThemeScope>
  );
}
