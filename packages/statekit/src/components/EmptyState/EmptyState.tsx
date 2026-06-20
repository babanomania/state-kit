"use client";

import type { ReactNode } from "react";
import { InboxGlyph } from "../../icons";
import { StateLayout } from "../../primitives/StateLayout";
import { ThemeScope, type ThemeInput } from "../../theme/StateProvider";

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  theme?: ThemeInput;
}

export function EmptyState({ icon = <InboxGlyph />, title, description, action, theme }: EmptyStateProps) {
  return (
    <ThemeScope theme={theme}>
      <StateLayout icon={icon} title={title} description={description} action={action} maxDescriptionWidth={280} />
    </ThemeScope>
  );
}
