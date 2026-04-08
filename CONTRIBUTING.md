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
