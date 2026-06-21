export interface ComponentMeta {
  id: string;
  name: string;
  cat: string;
  variantLabels: string[];
}

/**
 * Plain (no-JSX) metadata mirroring CATALOG in componentCatalog.tsx, kept separate so the
 * Playwright visual-regression spec can import it without pulling in React/statekit, which
 * Playwright's test loader cannot resolve.
 */
export const COMPONENT_META: ComponentMeta[] = [
  {
    id: "spinner",
    name: "Spinner",
    cat: "Loading",
    variantLabels: [
      "Default",
      "Dashed",
      "Thin"
    ]
  },
  {
    id: "orbit",
    name: "OrbitLoader",
    cat: "Loading",
    variantLabels: [
      "Single",
      "Dual",
      "Trio"
    ]
  },
  {
    id: "skeleton",
    name: "Skeleton",
    cat: "Loading",
    variantLabels: [
      "Text",
      "Card",
      "Avatar",
      "Table"
    ]
  },
  {
    id: "progress",
    name: "ProgressLoader",
    cat: "Loading",
    variantLabels: [
      "Indeterminate",
      "Linear"
    ]
  },
  {
    id: "pulse",
    name: "PulseLoader",
    cat: "Loading",
    variantLabels: [
      "Dots",
      "Ring",
      "Grid"
    ]
  },
  {
    id: "wave",
    name: "WaveLoader",
    cat: "Loading",
    variantLabels: [
      "Default",
      "Fast"
    ]
  },
  {
    id: "typing",
    name: "TypingIndicator",
    cat: "Loading",
    variantLabels: [
      "Dots",
      "Typewriter"
    ]
  },
  {
    id: "empty",
    name: "EmptyState",
    cat: "Empty",
    variantLabels: [
      "Illustration",
      "Minimal",
      "Enterprise"
    ]
  },
  {
    id: "searchempty",
    name: "SearchEmptyState",
    cat: "Empty",
    variantLabels: [
      "Default",
      "Suggestions"
    ]
  },
  {
    id: "filterempty",
    name: "FilterEmptyState",
    cat: "Empty",
    variantLabels: [
      "Default",
      "Clearable"
    ]
  },
  {
    id: "error",
    name: "ErrorState",
    cat: "Error",
    variantLabels: [
      "Friendly",
      "Technical",
      "Enterprise"
    ]
  },
  {
    id: "retry",
    name: "RetryState",
    cat: "Error",
    variantLabels: [
      "Manual",
      "Auto countdown"
    ]
  },
  {
    id: "server",
    name: "ServerErrorState",
    cat: "Error",
    variantLabels: [
      "500",
      "503"
    ]
  },
  {
    id: "notfound",
    name: "NotFoundState",
    cat: "Error",
    variantLabels: [
      "Page",
      "Resource"
    ]
  },
  {
    id: "forbidden",
    name: "ForbiddenState",
    cat: "Error",
    variantLabels: [
      "Default",
      "Contact"
    ]
  },
  {
    id: "timeout",
    name: "TimeoutState",
    cat: "Error",
    variantLabels: [
      "Default",
      "Slow"
    ]
  },
  {
    id: "validation",
    name: "ValidationErrorState",
    cat: "Error",
    variantLabels: [
      "Email",
      "Required"
    ]
  },
  {
    id: "success",
    name: "SuccessState",
    cat: "Success",
    variantLabels: [
      "Default",
      "No action"
    ]
  },
  {
    id: "completed",
    name: "CompletedState",
    cat: "Success",
    variantLabels: [
      "Task",
      "Onboarding"
    ]
  },
  {
    id: "offline",
    name: "OfflineState",
    cat: "Connectivity",
    variantLabels: [
      "With signal",
      "No signal"
    ]
  },
  {
    id: "reconnecting",
    name: "ReconnectingState",
    cat: "Connectivity",
    variantLabels: [
      "Pulse",
      "Countdown"
    ]
  },
  {
    id: "access",
    name: "AccessDeniedState",
    cat: "Security",
    variantLabels: [
      "Lock",
      "Shield"
    ]
  },
  {
    id: "session",
    name: "SessionExpiredState",
    cat: "Security",
    variantLabels: [
      "Modal",
      "Inline"
    ]
  },
  {
    id: "table",
    name: "TableState",
    cat: "Data",
    variantLabels: [
      "Loading",
      "Empty",
      "Error"
    ]
  },
  {
    id: "dashboard",
    name: "DashboardState",
    cat: "Data",
    variantLabels: [
      "Loading",
      "Partial failure"
    ]
  },
  {
    id: "widget",
    name: "WidgetState",
    cat: "Data",
    variantLabels: [
      "Loading",
      "Failure",
      "Empty"
    ]
  },
  {
    id: "partial",
    name: "PartialFailureState",
    cat: "Data",
    variantLabels: [
      "Rows",
      "Mixed"
    ]
  },
  {
    id: "paginationend",
    name: "PaginationEndState",
    cat: "Data",
    variantLabels: [
      "Default",
      "Back to top"
    ]
  },
  {
    id: "stale",
    name: "StaleDataState",
    cat: "Data",
    variantLabels: [
      "Refreshing",
      "Cached"
    ]
  },
  {
    id: "maintenance",
    name: "MaintenanceState",
    cat: "System",
    variantLabels: [
      "Scheduled",
      "Live"
    ]
  },
  {
    id: "ratelimit",
    name: "RateLimitedState",
    cat: "System",
    variantLabels: [
      "Countdown",
      "Upgrade"
    ]
  },
  {
    id: "quota",
    name: "QuotaExceededState",
    cat: "System",
    variantLabels: [
      "Storage",
      "Seats"
    ]
  }
];
