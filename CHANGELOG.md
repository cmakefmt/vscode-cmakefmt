# Changelog

## Unreleased

### Changed

- Format-on-save is now driven by VS Code's standard `editor.formatOnSave`
  setting (optionally scoped to `[cmake]`). The custom save listener has
  been removed so the extension composes correctly with `formatOnSaveMode`,
  workspace trust, and other editor knobs.

### Deprecated

- `cmakefmt.onSave` is deprecated and no longer read. Configure
  `editor.formatOnSave` instead. The setting will be removed in a future
  release.

## 1.0.0

### Added

- Initial release of `vscode-cmakefmt`
- Document formatting provider for CMake files (`cmake` language ID)
- Format-on-save support (controlled by `cmakefmt.onSave`)
- `cmakefmt.executablePath` setting to point at a custom binary location
- `cmakefmt.extraArgs` setting for passing additional flags (e.g. `--config`)
- Clear error message when the `cmakefmt` binary is not found on `PATH`
