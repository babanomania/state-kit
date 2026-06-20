"use client";

import { useEffect } from "react";
import { SignalBarsIcon } from "../../icons";
import { StateLayout } from "../../primitives/StateLayout";
import { ThemeScope, type ThemeInput } from "../../theme/StateProvider";

export interface OfflineStateProps {
  autoDetect?: boolean;
  onReconnect?: () => void;
  showSignal?: boolean;
  theme?: ThemeInput;
}

export function OfflineState({ autoDetect = true, onReconnect, showSignal = true, theme }: OfflineStateProps) {
  useEffect(() => {
    if (!autoDetect || typeof navigator === "undefined") return;
    const handleOnline = () => onReconnect?.();
    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, [autoDetect, onReconnect]);

  return (
    <ThemeScope theme={theme}>
      <div role="alert">
        <StateLayout
          icon={showSignal ? <SignalBarsIcon /> : undefined}
          title="You're offline"
          description="We'll reconnect automatically once you're back."
          maxDescriptionWidth={260}
        />
      </div>
    </ThemeScope>
  );
}
