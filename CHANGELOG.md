# Changelog

## Unreleased

### Fixed

- Exclude local agent settings from packaged extensions.
- Report registry publishing failures instead of silently marking releases
  successful. Open VSX publication is still attempted if Marketplace fails.

### Changed

- Refresh development and publishing dependencies. Pin VS Code API typings
  to the supported minimum editor version, 1.110.0.
- Share the patched VSCE packaging dependency with Open VSX rather than
  retaining its vulnerable nested version.

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
