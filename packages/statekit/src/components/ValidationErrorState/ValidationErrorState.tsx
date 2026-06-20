"use client";

import { ValidationWarningIcon } from "../../icons";
import { ThemeScope, type ThemeInput } from "../../theme/StateProvider";

export interface ValidationErrorStateProps {
  field: string;
  message: string;
  value?: string;
  shake?: boolean;
  theme?: ThemeInput;
}

export function ValidationErrorState({ field, message, value = "", shake = true, theme }: ValidationErrorStateProps) {
  return (
    <ThemeScope theme={theme}>
      <div role="alert" className="w-[260px] max-w-full">
        <label className="mb-2 block text-xs text-sk-muted" htmlFor={field}>
          {field}
        </label>
        <div className={shake ? "animate-sk-shake" : undefined}>
          <input
            id={field}
            readOnly
            value={value}
            aria-invalid="true"
            aria-describedby={`${field}-error`}
            className="flex h-10 w-full items-center rounded-[9px] border-[1.5px] px-3.5 font-mono text-[13px]"
            style={{ borderColor: "#f7768e", background: "rgba(247,118,142,0.07)", color: "#f7768e" }}
          />
          <div id={`${field}-error`} className="mt-2 flex items-center gap-1.5 text-xs" style={{ color: "#f7768e" }}>
            <ValidationWarningIcon />
            {message}
          </div>
        </div>
      </div>
    </ThemeScope>
  );
}
