"use client";

import { MaintenanceGlyph } from "../../icons";
import { StateLayout } from "../../primitives/StateLayout";
import { ThemeScope, type ThemeInput } from "../../theme/StateProvider";

export interface MaintenanceStateProps {
  until?: Date;
  statusPageUrl?: string;
  message?: string;
  theme?: ThemeInput;
}

export function MaintenanceState({ until, statusPageUrl, message, theme }: MaintenanceStateProps) {
  const isScheduled = Boolean(until);
  const title = isScheduled ? "Scheduled maintenance" : "Maintenance in progress";
  const description =
    message ??
    (isScheduled
      ? "We're upgrading our systems. Back shortly."
      : "We're performing emergency maintenance.");
  const backBy = until ? until.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }) : null;

  return (
    <ThemeScope theme={theme}>
      <div role="status" aria-live="polite">
        <StateLayout
          icon={<MaintenanceGlyph />}
          title={title}
          description={description}
          maxDescriptionWidth={300}
          extra={
            backBy !== null ? (
              <span
                className="rounded-[7px] border px-3.5 py-1.5 font-mono text-[12px]"
                style={{ color: "#e0c060", background: "rgba(224,192,96,0.1)", borderColor: "rgba(224,192,96,0.25)" }}
              >
                Back by {backBy}
              </span>
            ) : statusPageUrl ? (
              <a href={statusPageUrl} className="font-mono text-[12px]" style={{ color: "var(--sk-muted)" }}>
                Live status
              </a>
            ) : undefined
          }
        />
      </div>
    </ThemeScope>
  );
}
