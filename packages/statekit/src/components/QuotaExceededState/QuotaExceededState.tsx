"use client";

import { CountdownRingGlyph } from "../../icons";
import { ActionButton } from "../../primitives/Button";
import { StateLayout } from "../../primitives/StateLayout";
import { useAutoFocus } from "../../primitives/useAutoFocus";
import { ThemeScope, type ThemeInput } from "../../theme/StateProvider";

export interface QuotaExceededStateProps {
  used: number;
  limit: number;
  unit?: string;
  onUpgrade?: () => void;
  theme?: ThemeInput;
}

export function QuotaExceededState({ used, limit, unit, onUpgrade, theme }: QuotaExceededStateProps) {
  const unitSuffix = unit ? ` ${unit}` : "";
  const description = `You've used ${used} of ${limit}${unitSuffix} on your current plan.`;
  const percent = limit > 0 ? Math.round((used / limit) * 100) : 0;
  const actionRef = useAutoFocus<HTMLButtonElement>(Boolean(onUpgrade));

  return (
    <ThemeScope theme={theme}>
      <div role="alert">
        <StateLayout
          icon={<CountdownRingGlyph label={`${percent}%`} />}
          title="Usage limit reached"
          description={description}
          maxDescriptionWidth={300}
          action={
            onUpgrade ? (
              <ActionButton ref={actionRef} onClick={onUpgrade}>
                Upgrade plan
              </ActionButton>
            ) : undefined
          }
        />
      </div>
    </ThemeScope>
  );
}
