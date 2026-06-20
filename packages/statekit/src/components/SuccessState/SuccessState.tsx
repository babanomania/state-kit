"use client";

import type { ReactNode } from "react";
import { SuccessGlyph } from "../../icons";
import { StateLayout } from "../../primitives/StateLayout";
import { ThemeScope, type ThemeInput } from "../../theme/StateProvider";

export interface SuccessStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
  theme?: ThemeInput;
}

export function SuccessState({ title, description, action, theme }: SuccessStateProps) {
  return (
    <ThemeScope theme={theme}>
      <div role="status" aria-live="polite">
        <StateLayout icon={<SuccessGlyph />} title={title} description={description} action={action} />
      </div>
    </ThemeScope>
  );
}
