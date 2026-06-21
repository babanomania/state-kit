"use client";

import { LockGlyph } from "../../icons";
import { ActionButton } from "../../primitives/Button";
import { StateLayout } from "../../primitives/StateLayout";
import { useAutoFocus } from "../../primitives/useAutoFocus";
import { ThemeScope, type ThemeInput } from "../../theme/StateProvider";

export interface ForbiddenStateProps {
  onBack?: () => void;
  contactUrl?: string;
  theme?: ThemeInput;
}

export function ForbiddenState({ onBack, contactUrl, theme }: ForbiddenStateProps) {
  const usingContact = Boolean(contactUrl);
  const actionRef = useAutoFocus<HTMLButtonElement | HTMLAnchorElement>(usingContact || Boolean(onBack));

  return (
    <ThemeScope theme={theme}>
      <div role="alert">
        <StateLayout
          icon={<LockGlyph />}
          title={usingContact ? "Access forbidden" : "Forbidden · 403"}
          description={
            usingContact
              ? "Contact your workspace admin to request access."
              : "You don't have permission to perform this action."
          }
          action={
            usingContact ? (
              <ActionButton ref={actionRef} href={contactUrl}>
                Contact admin
              </ActionButton>
            ) : onBack ? (
              <ActionButton ref={actionRef} onClick={onBack}>
                Go back
              </ActionButton>
            ) : undefined
          }
        />
      </div>
    </ThemeScope>
  );
}
