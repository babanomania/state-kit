# state-kit

StateKit — a themeable, animated React component library for application states (loading, empty,
error, offline, success, and more), plus the site that documents and showcases it.

- **`packages/statekit`** — the publishable `statekit` npm package. See its
  [README](packages/statekit/README.md) for install/usage.
- **`apps/web`** — the Next.js marketing site, Components/Motion/Themes docs, deployed to GitHub
  Pages at https://babanomania.github.io/state-kit/.
- **`design/`** — the original design prototypes (source of truth for visuals; not shipped).

## Development

```bash
pnpm install
pnpm dev          # run the site (apps/web) in dev mode
pnpm build        # build every workspace (library, then site)
pnpm lint
pnpm typecheck
pnpm test
```

## Releasing the library

This repo uses [Changesets](https://github.com/changesets/changesets) to version and publish
`statekit`.

1. After a PR that changes `packages/statekit`, run `pnpm changeset` and describe the change. Commit
   the generated `.changeset/*.md` file with the PR.
2. Merging to `main` triggers a "Version Packages" PR (via `changesets/action`) that bumps the
   package version and updates its changelog.
3. Merging that Version PR publishes `statekit` to npm.
