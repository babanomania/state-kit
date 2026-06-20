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

## Documentation

Full component catalog, theming guide, and motion gallery:
https://babanomania.github.io/state-kit/

## License

MIT
