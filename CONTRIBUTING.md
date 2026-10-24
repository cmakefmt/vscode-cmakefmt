# Contributing

Bug reports, issues, and pull requests are welcome.

For general contribution guidelines, coding standards, and changelog policy,
see [CONTRIBUTING.md](https://github.com/cmakefmt/cmakefmt/blob/main/CONTRIBUTING.md)
in the main `cmakefmt` repository.

## This Repo

This repository contains the VS Code extension for `cmakefmt`. It invokes the
`cmakefmt` binary as an external process — the formatting logic itself lives in
the main repository.

Changes here typically fall into one of:

- Updating extension settings or activation logic (`src/extension.ts`)
- Improving error handling or user-facing messages
- Updating the extension version to match a new `cmakefmt` release

## Dev Setup

```bash
npm install
npm run compile
```

Open the repo in VS Code and press `F5` to launch an Extension Development Host
with the extension loaded.

## Managing Dependencies

CI uses `npm ci`, which requires `package.json` and `package-lock.json` to be
exactly in sync. After adding, removing, or updating a dependency in
`package.json`, always run:

```bash
npm install
```

This regenerates `package-lock.json`. **Commit both files together** —
otherwise CI will fail.

The scoped `@azure/identity` override selects MSAL Node 7.1.1 or later to
address [GHSA-xcx6-jx8p-x3h5](https://github.com/advisories/GHSA-xcx6-jx8p-x3h5).
Azure Identity 4.14 still requests the affected MSAL 6.x major. Remove the
override once Azure Identity requests a patched version itself. Run
`npm run test:publishing-auth` when changing these dependencies; it checks
token acquisition and caching with a fake HTTP transport and no credentials
or external requests.
