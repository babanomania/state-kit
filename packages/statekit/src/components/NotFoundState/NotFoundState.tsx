"use client";

import { GlitchDigits } from "../../icons";
import { ActionButton } from "../../primitives/Button";
import { StateLayout } from "../../primitives/StateLayout";
import { useAutoFocus } from "../../primitives/useAutoFocus";
import { ThemeScope, type ThemeInput } from "../../theme/StateProvider";

export interface NotFoundStateProps {
  title?: string;
  homeUrl?: string;
  code?: number;
  theme?: ThemeInput;
}

export function NotFoundState({ title = "Page not found", homeUrl, code = 404, theme }: NotFoundStateProps) {
  const actionRef = useAutoFocus<HTMLAnchorElement>(Boolean(homeUrl));

  return (
    <ThemeScope theme={theme}>
      <div role="alert">
        <StateLayout
          icon={<GlitchDigits code={code} />}
          title={title}
          description="The page you're looking for doesn't exist or has moved."
          action={homeUrl ? <ActionButton ref={actionRef} href={homeUrl}>Go home</ActionButton> : undefined}
        />
      </div>
    </ThemeScope>
  );
}
