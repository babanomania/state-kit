"use client";

import { LockGlyph, ShieldIcon } from "../../icons";
import { ActionButton } from "../../primitives/Button";
import { StateLayout } from "../../primitives/StateLayout";
import { ThemeScope, type ThemeInput } from "../../theme/StateProvider";

export type AccessDeniedVariant = "lock" | "shield";

export interface AccessDeniedStateProps {
  resource?: string;
  onRequestAccess?: () => void;
  variant?: AccessDeniedVariant;
  theme?: ThemeInput;
}

export function AccessDeniedState({
  resource,
  onRequestAccess,
  variant = "lock",
  theme,
}: AccessDeniedStateProps) {
  const title = variant === "shield" ? "Restricted area" : "Access denied";
  const description =
    variant === "shield"
      ? "This section requires elevated permissions."
      : `You don't have permission to view ${resource ?? "this resource"}.`;

  return (
    <ThemeScope theme={theme}>
      <div role="alert">
        <StateLayout
          icon={variant === "shield" ? <ShieldIcon /> : <LockGlyph />}
          title={title}
          description={description}
          maxDescriptionWidth={280}
          action={
            onRequestAccess ? <ActionButton onClick={onRequestAccess}>Request access</ActionButton> : undefined
          }
        />
      </div>
    </ThemeScope>
  );
}
