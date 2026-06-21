"use client";

import { LockGlyph } from "../../icons";
import { ActionButton } from "../../primitives/Button";
import { StateLayout } from "../../primitives/StateLayout";
import { useAutoFocus } from "../../primitives/useAutoFocus";
import { ThemeScope, type ThemeInput } from "../../theme/StateProvider";

export type SessionExpiredVariant = "modal" | "inline";

export interface SessionExpiredStateProps {
  onReauth: () => void;
  preservePath?: boolean;
  variant?: SessionExpiredVariant;
  theme?: ThemeInput;
}

const copy: Record<SessionExpiredVariant, { title: string; description: string }> = {
  modal: { title: "Session expired", description: "Please sign in again to continue where you left off." },
  inline: { title: "You've been signed out", description: "Re-authenticate to keep working." },
};

export function SessionExpiredState({
  onReauth,
  variant = "modal",
  theme,
}: SessionExpiredStateProps) {
  const variantCopy = copy[variant];
  const actionRef = useAutoFocus<HTMLButtonElement>(true);

  return (
    <ThemeScope theme={theme}>
      <div role="alert">
        <StateLayout
          icon={<LockGlyph />}
          title={variantCopy.title}
          description={variantCopy.description}
          maxDescriptionWidth={280}
          action={
            <ActionButton ref={actionRef} onClick={onReauth}>
              Sign in
            </ActionButton>
          }
        />
      </div>
    </ThemeScope>
  );
}
