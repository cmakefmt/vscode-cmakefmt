# Changelog

## Unreleased

### Added

- Initial release of `vscode-cmakefmt`
- Document formatting provider for CMake files (`cmake` language ID)
- Format-on-save support (controlled by `cmakefmt.onSave`)
- `cmakefmt.executablePath` setting to point at a custom binary location
- `cmakefmt.extraArgs` setting for passing additional flags (e.g. `--config`)
- Clear error message when the `cmakefmt` binary is not found on `PATH`
