"use client";

import { ActionButton } from "../../primitives/Button";
import { StateLayout } from "../../primitives/StateLayout";
import { ThemeScope, type ThemeInput } from "../../theme/StateProvider";

export interface PaginationEndStateProps {
  total?: number;
  onBackToTop?: () => void;
  theme?: ThemeInput;
}

export function PaginationEndState({ total, onBackToTop, theme }: PaginationEndStateProps) {
  const description =
    total !== undefined
      ? `That's everything — ${total} record${total === 1 ? "" : "s"} loaded.`
      : "No more items to load.";

  return (
    <ThemeScope theme={theme}>
      <StateLayout
        title="You've reached the end"
        description={description}
        maxDescriptionWidth={260}
        action={
          onBackToTop ? (
            <ActionButton variant="outline" onClick={onBackToTop}>
              Back to top
            </ActionButton>
          ) : undefined
        }
      />
    </ThemeScope>
  );
}
