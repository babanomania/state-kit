"use client";

import type { ReactNode } from "react";

export interface StateLayoutProps {
  icon?: ReactNode;
  title: string;
  description?: ReactNode;
  action?: ReactNode;
  extra?: ReactNode;
  maxDescriptionWidth?: number;
  className?: string;
}

/** Shared icon + title + description + action column used by most non-data state categories. */
export function StateLayout({
  icon,
  title,
  description,
  action,
  extra,
  maxDescriptionWidth = 300,
  className,
}: StateLayoutProps) {
  return (
    <div className={`flex flex-col items-center gap-[18px] text-center ${className ?? ""}`}>
      {icon}
      <div>
        <div className="mb-1.5 text-[17px] font-semibold text-sk-text">{title}</div>
        {description ? (
          <div className="mx-auto text-[13.5px] text-sk-muted" style={{ maxWidth: maxDescriptionWidth }}>
            {description}
          </div>
        ) : null}
      </div>
      {extra}
      {action}
    </div>
  );
}
