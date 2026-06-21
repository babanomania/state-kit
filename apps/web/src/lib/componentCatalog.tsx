import type { ReactNode } from "react";
import {
  AccessDeniedState,
  CompletedState,
  DashboardState,
  EmptyState,
  ErrorState,
  FilterEmptyState,
  ForbiddenState,
  MaintenanceState,
  NotFoundState,
  OfflineState,
  OrbitLoader,
  PaginationEndState,
  PartialFailureState,
  ProgressLoader,
  PulseLoader,
  QuotaExceededState,
  RateLimitedState,
  ReconnectingState,
  RetryState,
  SearchEmptyState,
  ServerErrorState,
  SessionExpiredState,
  Skeleton,
  Spinner,
  StaleDataState,
  SuccessState,
  TableState,
  TimeoutState,
  TypingIndicator,
  ValidationErrorState,
  WaveLoader,
  WidgetState,
} from "@babanomania/statekit";

const noop = () => {};
/** Fixed reference instants so previews are deterministic across server/client renders. */
const FIXED_NOW = new Date("2026-06-20T15:18:00");
const FIXED_FUTURE = new Date("2026-06-20T15:30:00");

export interface CatalogProp {
  name: string;
  type: string;
  def: string;
  desc: string;
}

export interface CatalogEntry {
  id: string;
  name: string;
  cat: string;
  dot: string;
  desc: string;
  code: string;
  props: CatalogProp[];
  variantLabels: string[];
  render: (variant: number) => ReactNode;
}

export const CATEGORY_ORDER = [
  "Loading",
  "Empty",
  "Error",
  "Success",
  "Connectivity",
  "Security",
  "Data",
  "System",
] as const;

export const CATALOG: CatalogEntry[] = [
  // ---- Loading ----
  {
    id: "spinner",
    name: "Spinner",
    cat: "Loading",
    dot: "#8b7cff",
    desc: "A minimal rotating indicator for inline and full-screen loading. Respects reduced-motion.",
    code: '<Spinner\n  size={56}\n  variant="default"\n  color="violet"\n/>',
    props: [
      { name: "size", type: "number", def: "40", desc: "Diameter in pixels." },
      { name: "variant", type: '"default" | "dashed" | "thin"', def: '"default"', desc: "Visual style of the ring." },
      { name: "color", type: "ThemeColor", def: '"accent"', desc: "Stroke color token." },
      { name: "speed", type: "number", def: "1", desc: "Rotation speed multiplier." },
    ],
    variantLabels: ["Default", "Dashed", "Thin"],
    render: (v) => <Spinner size={56} variant={(["default", "dashed", "thin"] as const)[v]} />,
  },
  {
    id: "orbit",
    name: "OrbitLoader",
    cat: "Loading",
    dot: "#8b7cff",
    desc: "Counter-rotating orbits with glowing satellites. Great for hero and full-screen loads.",
    code: '<OrbitLoader\n  variant="dual"\n  size={84}\n  glow\n/>',
    props: [
      { name: "variant", type: '"single" | "dual" | "trio"', def: '"dual"', desc: "Number of orbiting rings." },
      { name: "size", type: "number", def: "84", desc: "Outer diameter in pixels." },
      { name: "glow", type: "boolean", def: "true", desc: "Adds a neon glow to satellites." },
    ],
    variantLabels: ["Single", "Dual", "Trio"],
    render: (v) => <OrbitLoader variant={(["single", "dual", "trio"] as const)[v]} />,
  },
  {
    id: "skeleton",
    name: "Skeleton",
    cat: "Loading",
    dot: "#8b7cff",
    desc: "Shimmering content placeholders that mirror your layout while data loads.",
    code: '<Skeleton variant="card">\n  <Skeleton.Avatar />\n  <Skeleton.Line width="75%" />\n  <Skeleton.Line width="100%" />\n</Skeleton>',
    props: [
      { name: "variant", type: '"text" | "card" | "avatar" | "table"', def: '"text"', desc: "Preset shape grouping." },
      { name: "lines", type: "number", def: "3", desc: "Number of placeholder lines." },
      { name: "shimmer", type: "boolean", def: "true", desc: "Toggle the shimmer sweep." },
    ],
    variantLabels: ["Text", "Card", "Avatar", "Table"],
    render: (v) => <Skeleton variant={(["text", "card", "avatar", "table"] as const)[v]} />,
  },
  {
    id: "progress",
    name: "ProgressLoader",
    cat: "Loading",
    dot: "#8b7cff",
    desc: "Determinate or indeterminate progress with a smooth gradient fill.",
    code: '<ProgressLoader\n  variant="indeterminate"\n  label="Fetching…"\n/>',
    props: [
      { name: "variant", type: '"indeterminate" | "linear"', def: '"indeterminate"', desc: "Fill behavior." },
      { name: "value", type: "number", def: "—", desc: "0–100 for determinate progress." },
      { name: "label", type: "string", def: "undefined", desc: "Optional caption below the bar." },
    ],
    variantLabels: ["Indeterminate", "Linear"],
    render: (v) =>
      v === 0 ? (
        <ProgressLoader variant="indeterminate" label="Fetching…" />
      ) : (
        <ProgressLoader variant="linear" value={68} label="68% complete" />
      ),
  },
  {
    id: "pulse",
    name: "PulseLoader",
    cat: "Loading",
    dot: "#8b7cff",
    desc: "Staggered pulsing elements — the lightest possible loading hint.",
    code: '<PulseLoader variant="dots" count={3} />',
    props: [
      { name: "variant", type: '"dots" | "ring" | "grid"', def: '"dots"', desc: "Pulse arrangement." },
      { name: "count", type: "number", def: "3", desc: "Number of elements." },
      { name: "gap", type: "number", def: "12", desc: "Spacing in pixels." },
    ],
    variantLabels: ["Dots", "Ring", "Grid"],
    render: (v) => <PulseLoader variant={(["dots", "ring", "grid"] as const)[v]} />,
  },
  {
    id: "wave",
    name: "WaveLoader",
    cat: "Loading",
    dot: "#8b7cff",
    desc: "Equalizer-style bars that rise and fall — ideal for audio and streaming contexts.",
    code: '<WaveLoader bars={5} color="cyan" />',
    props: [
      { name: "bars", type: "number", def: "5", desc: "Number of bars." },
      { name: "color", type: "ThemeColor", def: '"accent"', desc: "Bar fill token." },
      { name: "speed", type: "number", def: "1", desc: "Animation speed multiplier." },
    ],
    variantLabels: ["Default", "Fast"],
    render: (v) => (v === 0 ? <WaveLoader bars={5} color="cyan" /> : <WaveLoader bars={5} color="violet" speed={1.7} />),
  },
  {
    id: "typing",
    name: "TypingIndicator",
    cat: "Loading",
    dot: "#8b7cff",
    desc: "Streaming-response indicator — bouncing dots, or a live typewriter for token streams.",
    code: '<TypingIndicator\n  variant="dots"\n  active={isStreaming}\n/>',
    props: [
      { name: "variant", type: '"dots" | "typewriter"', def: '"dots"', desc: "Indicator style." },
      { name: "active", type: "boolean", def: "true", desc: "Whether to animate." },
      { name: "text", type: "string", def: "undefined", desc: "Text to type out in typewriter mode." },
    ],
    variantLabels: ["Dots", "Typewriter"],
    render: (v) => (v === 0 ? <TypingIndicator variant="dots" /> : <TypingIndicator variant="typewriter" text="Generating answer" />),
  },

  // ---- Empty ----
  {
    id: "empty",
    name: "EmptyState",
    cat: "Empty",
    dot: "#4fd6e0",
    desc: "The canonical empty state — an illustration, a message, and a primary action.",
    code: '<EmptyState\n  title="No users yet"\n  description="Invite your team to get started."\n  action={<InviteButton />}\n/>',
    props: [
      { name: "icon", type: "ReactNode", def: "<InboxGlyph />", desc: "Glyph shown above the title." },
      { name: "title", type: "string", def: "required", desc: "Headline text." },
      { name: "description", type: "string", def: "undefined", desc: "Supporting copy." },
      { name: "action", type: "ReactNode", def: "undefined", desc: "Primary call to action." },
    ],
    variantLabels: ["Illustration", "Minimal", "Enterprise"],
    render: (v) => {
      if (v === 0) {
        return (
          <EmptyState
            title="No users yet"
            description="Invite your team to get started."
            action={<button className="rounded-lg bg-[#8b7cff] px-4 py-2 text-[13px] font-medium text-white">Invite people</button>}
          />
        );
      }
      if (v === 1) {
        return <EmptyState icon={null} title="No users yet" description="Your team will appear here." />;
      }
      return (
        <EmptyState
          title="No users in this workspace"
          description="Add members or import from your directory to begin."
          action={<button className="rounded-lg bg-[#8b7cff] px-4 py-2 text-[13px] font-medium text-white">Add members</button>}
        />
      );
    },
  },
  {
    id: "searchempty",
    name: "SearchEmptyState",
    cat: "Empty",
    dot: "#4fd6e0",
    desc: "Shown when a query returns nothing. Echoes the search term and suggests next steps.",
    code: "<SearchEmptyState\n  query={query}\n  suggestions={['quarterly','income','ARR']}\n/>",
    props: [
      { name: "query", type: "string", def: "required", desc: "The term that returned no results." },
      { name: "suggestions", type: "string[]", def: "[]", desc: "Recovery suggestions to render." },
      { name: "onClear", type: "() => void", def: "undefined", desc: "Clear-search callback." },
    ],
    variantLabels: ["Default", "Suggestions"],
    render: (v) =>
      v === 0 ? (
        <SearchEmptyState query="revenue" />
      ) : (
        <SearchEmptyState query="revenue" suggestions={["quarterly", "income", "ARR"]} onClear={noop} />
      ),
  },
  {
    id: "filterempty",
    name: "FilterEmptyState",
    cat: "Empty",
    dot: "#4fd6e0",
    desc: "Empty state caused by active filters, with a one-tap reset.",
    code: "<FilterEmptyState\n  activeFilters={3}\n  onReset={resetFilters}\n/>",
    props: [
      { name: "activeFilters", type: "number", def: "0", desc: "Count of applied filters." },
      { name: "onReset", type: "() => void", def: "undefined", desc: "Reset-all callback." },
    ],
    variantLabels: ["Default", "Clearable"],
    render: (v) => (v === 0 ? <FilterEmptyState activeFilters={3} /> : <FilterEmptyState activeFilters={3} onReset={noop} />),
  },

  // ---- Error ----
  {
    id: "error",
    name: "ErrorState",
    cat: "Error",
    dot: "#f7768e",
    desc: "A friendly, themeable error surface with retry. The workhorse of the library.",
    code: '<ErrorState\n  variant="friendly"\n  title="Something went wrong"\n  retry={refetch}\n/>',
    props: [
      { name: "variant", type: '"friendly" | "technical" | "enterprise"', def: '"friendly"', desc: "Tone and density of copy." },
      { name: "title", type: "string", def: '"Something went wrong"', desc: "Headline text." },
      { name: "retry", type: "() => void", def: "undefined", desc: "Retry handler — renders a button." },
      { name: "error", type: "Error", def: "undefined", desc: "Raw error for technical variant." },
    ],
    variantLabels: ["Friendly", "Technical", "Enterprise"],
    render: (v) => {
      const variant = (["friendly", "technical", "enterprise"] as const)[v];
      return <ErrorState variant={variant} retry={noop} error={variant === "technical" ? new Error("500 Internal Server Error") : undefined} />;
    },
  },
  {
    id: "retry",
    name: "RetryState",
    cat: "Error",
    dot: "#f7768e",
    desc: "Error variant with an automatic countdown that retries on its own.",
    code: "<RetryState\n  onRetry={refetch}\n  autoRetry={3000}\n  maxAttempts={3}\n/>",
    props: [
      { name: "onRetry", type: "() => void", def: "required", desc: "Called on each attempt." },
      { name: "autoRetry", type: "number", def: "undefined", desc: "Delay in ms before auto-retry." },
      { name: "maxAttempts", type: "number", def: "3", desc: "Stop after N attempts." },
    ],
    variantLabels: ["Manual", "Auto countdown"],
    render: (v) => (v === 0 ? <RetryState onRetry={noop} /> : <RetryState onRetry={noop} autoRetry={3000} />),
  },
  {
    id: "server",
    name: "ServerErrorState",
    cat: "Error",
    dot: "#f7768e",
    desc: "Dedicated 5xx surface with status code and an optional status-page link.",
    code: '<ServerErrorState\n  status={500}\n  statusPageUrl="/status"\n/>',
    props: [
      { name: "status", type: "number", def: "500", desc: "HTTP status code to display." },
      { name: "statusPageUrl", type: "string", def: "undefined", desc: "Link to your status page." },
      { name: "retry", type: "() => void", def: "undefined", desc: "Retry handler." },
    ],
    variantLabels: ["500", "503"],
    render: (v) => <ServerErrorState status={v === 0 ? 500 : 503} statusPageUrl="/status" />,
  },
  {
    id: "notfound",
    name: "NotFoundState",
    cat: "Error",
    dot: "#f7768e",
    desc: "A 404 with a glitchy, self-assembling numeral animation. Memorable without being cute.",
    code: '<NotFoundState\n  title="Page not found"\n  homeUrl="/"\n/>',
    props: [
      { name: "title", type: "string", def: '"Page not found"', desc: "Headline text." },
      { name: "homeUrl", type: "string", def: "undefined", desc: "Link target for the home action." },
      { name: "code", type: "number", def: "404", desc: "Status code shown in the glyph." },
    ],
    variantLabels: ["Page", "Resource"],
    render: (v) => (v === 0 ? <NotFoundState homeUrl="/" /> : <NotFoundState title="Not found" />),
  },
  {
    id: "forbidden",
    name: "ForbiddenState",
    cat: "Error",
    dot: "#f7768e",
    desc: "A 403 surface — the request was understood but is refused. Distinct from access-request flows.",
    code: "<ForbiddenState\n  onBack={goBack}\n/>",
    props: [
      { name: "onBack", type: "() => void", def: "undefined", desc: "Back-navigation handler." },
      { name: "contactUrl", type: "string", def: "undefined", desc: "Optional admin-contact link." },
    ],
    variantLabels: ["Default", "Contact"],
    render: (v) => (v === 0 ? <ForbiddenState onBack={noop} /> : <ForbiddenState contactUrl="/contact" />),
  },
  {
    id: "timeout",
    name: "TimeoutState",
    cat: "Error",
    dot: "#f7768e",
    desc: "The request exceeded its deadline. Shows elapsed time and offers a retry.",
    code: "<TimeoutState\n  timeoutMs={30000}\n  onRetry={refetch}\n/>",
    props: [
      { name: "timeoutMs", type: "number", def: "30000", desc: "Deadline in milliseconds." },
      { name: "onRetry", type: "() => void", def: "undefined", desc: "Retry handler." },
      { name: "elapsed", type: "number", def: "undefined", desc: "Elapsed time for the label." },
    ],
    variantLabels: ["Default", "Slow"],
    render: (v) => (v === 0 ? <TimeoutState timeoutMs={30000} onRetry={noop} /> : <TimeoutState timeoutMs={30000} elapsed={45000} onRetry={noop} />),
  },
  {
    id: "validation",
    name: "ValidationErrorState",
    cat: "Error",
    dot: "#f7768e",
    desc: "Inline field-level validation with a horizontal shake to draw attention to the error.",
    code: '<ValidationErrorState\n  field="email"\n  message="Enter a valid email address"\n  shake\n/>',
    props: [
      { name: "field", type: "string", def: "required", desc: "Field the error belongs to." },
      { name: "message", type: "string", def: "required", desc: "Validation message to show." },
      { name: "shake", type: "boolean", def: "true", desc: "Play the shake animation." },
    ],
    variantLabels: ["Email", "Required"],
    render: (v) =>
      v === 0 ? (
        <ValidationErrorState field="email" message="Enter a valid email address" value="invalid@" />
      ) : (
        <ValidationErrorState field="name" message="This field is required" value="" />
      ),
  },

  // ---- Success ----
  {
    id: "success",
    name: "SuccessState",
    cat: "Success",
    dot: "#5ec98a",
    desc: "A confirmation surface with a checkmark that strokes itself on inside a popping ring.",
    code: '<SuccessState\n  title="All set!"\n  description="Your changes have been saved."\n  action={<ContinueButton />}\n/>',
    props: [
      { name: "title", type: "string", def: "required", desc: "Headline text." },
      { name: "description", type: "string", def: "undefined", desc: "Supporting copy." },
      { name: "action", type: "ReactNode", def: "undefined", desc: "Optional next-step action." },
    ],
    variantLabels: ["Default", "No action"],
    render: (v) =>
      v === 0 ? (
        <SuccessState
          title="All set!"
          description="Your changes have been saved successfully."
          action={<button className="rounded-lg bg-[#8b7cff] px-4 py-2 text-[13px] font-medium text-white">Continue</button>}
        />
      ) : (
        <SuccessState title="Payment received" description="A receipt is on its way to your inbox." />
      ),
  },
  {
    id: "completed",
    name: "CompletedState",
    cat: "Success",
    dot: "#5ec98a",
    desc: "Marks a flow or task as done — a terminal success state for wizards and checkouts.",
    code: '<CompletedState\n  title="Task complete"\n  onDone={close}\n/>',
    props: [
      { name: "title", type: "string", def: "required", desc: "Headline text." },
      { name: "onDone", type: "() => void", def: "undefined", desc: "Dismiss / continue handler." },
      { name: "confetti", type: "boolean", def: "false", desc: "Fire a confetti burst on mount." },
    ],
    variantLabels: ["Task", "Onboarding"],
    render: (v) =>
      v === 0 ? (
        <CompletedState title="Task complete" description="Nice work. This item is now marked as done." onDone={noop} />
      ) : (
        <CompletedState title="You're all set up" description="Your workspace is ready to go." onDone={noop} confetti />
      ),
  },

  // ---- Connectivity ----
  {
    id: "offline",
    name: "OfflineState",
    cat: "Connectivity",
    dot: "#4fd6e0",
    desc: "Detects connection loss and animates signal degradation. Auto-recovers on reconnect.",
    code: "<OfflineState\n  autoDetect\n  onReconnect={refetch}\n  showSignal\n/>",
    props: [
      { name: "autoDetect", type: "boolean", def: "true", desc: "Listen to navigator.onLine." },
      { name: "onReconnect", type: "() => void", def: "undefined", desc: "Fires when back online." },
      { name: "showSignal", type: "boolean", def: "true", desc: "Render animated signal bars." },
    ],
    variantLabels: ["With signal", "No signal"],
    render: (v) => <OfflineState autoDetect={false} showSignal={v === 0} />,
  },
  {
    id: "reconnecting",
    name: "ReconnectingState",
    cat: "Connectivity",
    dot: "#4fd6e0",
    desc: "Transitional state shown while re-establishing a connection, with a pulse and countdown.",
    code: "<ReconnectingState\n  attempt={2}\n  nextRetryIn={5}\n/>",
    props: [
      { name: "attempt", type: "number", def: "1", desc: "Current reconnect attempt." },
      { name: "nextRetryIn", type: "number", def: "undefined", desc: "Seconds until next attempt." },
    ],
    variantLabels: ["Pulse", "Countdown"],
    render: (v) => (v === 0 ? <ReconnectingState /> : <ReconnectingState attempt={2} nextRetryIn={5} />),
  },

  // ---- Security ----
  {
    id: "access",
    name: "AccessDeniedState",
    cat: "Security",
    dot: "#5ec98a",
    desc: "Permission wall with a spring-loaded lock animation. Supports request-access flows.",
    code: '<AccessDeniedState\n  resource="Billing"\n  onRequestAccess={requestAccess}\n/>',
    props: [
      { name: "resource", type: "string", def: "undefined", desc: "Name of the gated resource." },
      { name: "onRequestAccess", type: "() => void", def: "undefined", desc: "Request-access handler." },
      { name: "variant", type: '"lock" | "shield"', def: '"lock"', desc: "Security glyph." },
    ],
    variantLabels: ["Lock", "Shield"],
    render: (v) => <AccessDeniedState resource="Billing" onRequestAccess={noop} variant={v === 0 ? "lock" : "shield"} />,
  },
  {
    id: "session",
    name: "SessionExpiredState",
    cat: "Security",
    dot: "#5ec98a",
    desc: "Prompts re-authentication without losing the user's place in the app.",
    code: "<SessionExpiredState\n  onReauth={login}\n  preservePath\n/>",
    props: [
      { name: "onReauth", type: "() => void", def: "required", desc: "Re-authenticate handler." },
      { name: "preservePath", type: "boolean", def: "true", desc: "Return to current route after login." },
      { name: "variant", type: '"modal" | "inline"', def: '"modal"', desc: "Presentation style." },
    ],
    variantLabels: ["Modal", "Inline"],
    render: (v) => <SessionExpiredState onReauth={noop} variant={v === 0 ? "modal" : "inline"} />,
  },

  // ---- Data ----
  {
    id: "table",
    name: "TableState",
    cat: "Data",
    dot: "#e0c060",
    desc: "Drop-in loading, empty and error states sized to your table. A StateKit signature.",
    code: "<TableState\n  rows={10}\n  columns={4}\n  status={status}\n/>",
    props: [
      { name: "rows", type: "number", def: "8", desc: "Placeholder row count." },
      { name: "columns", type: "number", def: "4", desc: "Column count to mirror." },
      { name: "status", type: '"loading" | "empty" | "error"', def: '"loading"', desc: "Which state to render." },
    ],
    variantLabels: ["Loading", "Empty", "Error"],
    render: (v) => <TableState rows={4} columns={3} status={(["loading", "empty", "error"] as const)[v]} />,
  },
  {
    id: "dashboard",
    name: "DashboardState",
    cat: "Data",
    dot: "#e0c060",
    desc: "Coordinates many widget states so a single failure never blanks the whole dashboard.",
    code: "<DashboardState widgets={widgets}>\n  {(w) => <Widget {...w} />}\n</DashboardState>",
    props: [
      { name: "widgets", type: "WidgetStatus[]", def: "required", desc: "Per-widget status map." },
      { name: "isolateFailures", type: "boolean", def: "true", desc: "Keep healthy widgets rendered." },
    ],
    variantLabels: ["Loading", "Partial failure"],
    render: (v) => (
      <DashboardState
        widgets={
          v === 0
            ? [
                { id: "revenue", title: "Revenue", status: "loading" },
                { id: "sessions", title: "Sessions", status: "loading" },
              ]
            : [
                { id: "revenue", title: "Revenue", status: "ready" },
                { id: "conversion", title: "Conversion", status: "error", onRetry: noop },
              ]
        }
      >
        {(w) => (
          <div className="flex h-16 items-center justify-center rounded-[11px] border border-sk-border bg-sk-surface text-[11px] text-sk-muted">
            {w.title}
          </div>
        )}
      </DashboardState>
    ),
  },
  {
    id: "widget",
    name: "WidgetState",
    cat: "Data",
    dot: "#e0c060",
    desc: "A single self-contained widget shell handling its own loading, empty and failure.",
    code: "<WidgetState status={status} onRetry={refetch}>\n  <RevenueChart />\n</WidgetState>",
    props: [
      { name: "status", type: "WidgetStatus", def: '"loading"', desc: "Current widget status." },
      { name: "onRetry", type: "() => void", def: "undefined", desc: "Per-widget retry handler." },
      { name: "compact", type: "boolean", def: "false", desc: "Dense dashboard sizing." },
    ],
    variantLabels: ["Loading", "Failure", "Empty"],
    render: (v) => <WidgetState status={(["loading", "error", "empty"] as const)[v]} onRetry={noop} />,
  },
  {
    id: "partial",
    name: "PartialFailureState",
    cat: "Data",
    dot: "#e0c060",
    desc: "Surfaces which records succeeded and which failed, with targeted retry.",
    code: "<PartialFailureState\n  succeeded={8}\n  failed={2}\n  onRetryFailed={retryFailed}\n/>",
    props: [
      { name: "succeeded", type: "number", def: "0", desc: "Count of successful records." },
      { name: "failed", type: "number", def: "0", desc: "Count of failed records." },
      { name: "onRetryFailed", type: "() => void", def: "undefined", desc: "Retry only the failures." },
    ],
    variantLabels: ["Rows", "Mixed"],
    render: (v) => (v === 0 ? <PartialFailureState succeeded={8} failed={2} onRetryFailed={noop} /> : <PartialFailureState succeeded={14} failed={6} onRetryFailed={noop} />),
  },
  {
    id: "paginationend",
    name: "PaginationEndState",
    cat: "Data",
    dot: "#e0c060",
    desc: "A gentle end-of-list marker so infinite scroll never just stops dead.",
    code: "<PaginationEndState\n  total={248}\n  onBackToTop={scrollTop}\n/>",
    props: [
      { name: "total", type: "number", def: "undefined", desc: "Total records loaded." },
      { name: "onBackToTop", type: "() => void", def: "undefined", desc: "Scroll-to-top handler." },
    ],
    variantLabels: ["Default", "Back to top"],
    render: (v) => (v === 0 ? <PaginationEndState total={248} /> : <PaginationEndState onBackToTop={noop} />),
  },
  {
    id: "stale",
    name: "StaleDataState",
    cat: "Data",
    dot: "#e0c060",
    desc: "Shows cached data with a “refreshing” affordance while new data loads in the background.",
    code: "<StaleDataState\n  lastUpdated={timestamp}\n  isRefreshing={isFetching}\n/>",
    props: [
      { name: "lastUpdated", type: "Date", def: "required", desc: "When the cache was last filled." },
      { name: "isRefreshing", type: "boolean", def: "false", desc: "Show the refreshing indicator." },
    ],
    variantLabels: ["Refreshing", "Cached"],
    render: (v) => <StaleDataState lastUpdated={FIXED_NOW} isRefreshing={v === 0} />,
  },

  // ---- System ----
  {
    id: "maintenance",
    name: "MaintenanceState",
    cat: "System",
    dot: "#e0c060",
    desc: "Scheduled-downtime screen with a live ETA and status-page link.",
    code: '<MaintenanceState\n  until={endTime}\n  statusPageUrl="/status"\n/>',
    props: [
      { name: "until", type: "Date", def: "undefined", desc: "When service resumes." },
      { name: "statusPageUrl", type: "string", def: "undefined", desc: "Link to status page." },
      { name: "message", type: "string", def: "undefined", desc: "Custom maintenance copy." },
    ],
    variantLabels: ["Scheduled", "Live"],
    render: (v) => (v === 0 ? <MaintenanceState until={FIXED_FUTURE} /> : <MaintenanceState statusPageUrl="/status" />),
  },
  {
    id: "ratelimit",
    name: "RateLimitedState",
    cat: "System",
    dot: "#e0c060",
    desc: "429 handling with a retry-after countdown and an optional upgrade prompt.",
    code: "<RateLimitedState\n  retryAfter={42}\n  onUpgrade={openPlans}\n/>",
    props: [
      { name: "retryAfter", type: "number", def: "required", desc: "Seconds from Retry-After header." },
      { name: "onUpgrade", type: "() => void", def: "undefined", desc: "Show upgrade options." },
      { name: "limit", type: "number", def: "undefined", desc: "Quota for context copy." },
    ],
    variantLabels: ["Countdown", "Upgrade"],
    render: (v) => (v === 0 ? <RateLimitedState retryAfter={42} /> : <RateLimitedState retryAfter={10} limit={60} onUpgrade={noop} />),
  },
  {
    id: "quota",
    name: "QuotaExceededState",
    cat: "System",
    dot: "#e0c060",
    desc: "Usage limit reached — communicates the cap and routes the user to an upgrade.",
    code: '<QuotaExceededState\n  used={10}\n  limit={10}\n  unit="GB"\n  onUpgrade={openPlans}\n/>',
    props: [
      { name: "used", type: "number", def: "required", desc: "Current usage." },
      { name: "limit", type: "number", def: "required", desc: "Plan ceiling." },
      { name: "unit", type: "string", def: "undefined", desc: "Unit label (GB, seats…)." },
    ],
    variantLabels: ["Storage", "Seats"],
    render: (v) =>
      v === 0 ? (
        <QuotaExceededState used={10} limit={10} unit="GB" onUpgrade={noop} />
      ) : (
        <QuotaExceededState used={5} limit={5} unit="seats" onUpgrade={noop} />
      ),
  },
];
