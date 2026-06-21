# statekit

Build Better States. 50+ application states — loading, empty, error, offline, success, and more —
as animated, themeable, production-ready React components.

## Install

```bash
npm install statekit
```

## Quickstart

```tsx
import { StateProvider, Spinner } from "statekit";
import "statekit/styles.css";

function App() {
  return (
    <StateProvider theme="aurora">
      <Spinner />
    </StateProvider>
  );
}
```

## The flagship: `DataStateBoundary`

Wrap a data fetch once — it renders the right state automatically (loading, error, empty, offline),
with built-in retry and offline detection:

```tsx
import { DataStateBoundary } from "statekit";

function Users() {
  const { data, loading, error, refetch } = useUsers();

  return (
    <DataStateBoundary loading={loading} error={error} data={data} onRetry={refetch} theme="aurora">
      {(users) => <UsersTable data={users} />}
    </DataStateBoundary>
  );
}
```

32 components across Loading, Empty, Error, Success, Connectivity, Security, Data, and System
categories — every one themeable via the same 6-token contract (`createTheme`) and built on motion
that respects `prefers-reduced-motion`.

## Documentation

Full component catalog, theming guide, and motion gallery:
https://babanomania.github.io/state-kit/

## License

MIT
