# vscode-cmakefmt

[![CI](https://github.com/cmakefmt/vscode-cmakefmt/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/cmakefmt/vscode-cmakefmt/actions/workflows/ci.yml)
[![VS Code Marketplace](https://img.shields.io/visual-studio-marketplace/v/cmakefmt.vscode-cmakefmt?label=VS%20Code%20Marketplace)](https://marketplace.visualstudio.com/items?itemName=cmakefmt.vscode-cmakefmt)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/cmakefmt.vscode-cmakefmt)](https://marketplace.visualstudio.com/items?itemName=cmakefmt.vscode-cmakefmt)

VS Code extension for [cmakefmt](https://cmakefmt.dev) — a fast, native CMake formatter.

## Features

- **Format on save** — CMake files are automatically formatted when saved
- **Format document** — run via the Command Palette (`Format Document`) or the keyboard shortcut
- **Configurable binary path** — point the extension at any `cmakefmt` installation
- **Extra arguments** — pass additional flags such as `--config`

## Requirements

`cmakefmt` must be installed and available on your `PATH`. Install it with:

```bash
# Homebrew (macOS)
brew install cmakefmt/cmakefmt/cmakefmt

# Cargo (any platform)
cargo install cmakefmt-rust
```

Or download a pre-built binary from [GitHub Releases](https://github.com/cmakefmt/cmakefmt/releases/latest).

## Settings

| Setting                   | Default      | Description                                                                            |
|---------------------------|--------------|----------------------------------------------------------------------------------------|
| `cmakefmt.executablePath` | `"cmakefmt"` | Path to the `cmakefmt` binary.                                                         |
| `cmakefmt.extraArgs`      | `[]`         | Extra arguments passed to `cmakefmt` (e.g. `["--config", "/path/to/.cmakefmt.yaml"]`). |
| `cmakefmt.onSave`         | `true`       | Format CMake files automatically on save.                                              |

## Usage

The extension activates automatically for files VS Code identifies as CMake (`cmake` language ID). To format manually, open a CMake file and run **Format Document** from the Command Palette or press the keyboard shortcut for your platform.

To disable format-on-save for a specific workspace, add the following to your `.vscode/settings.json`:

```json
{
  "cmakefmt.onSave": false
}
```

## License

MIT OR Apache-2.0 — see [LICENSE](LICENSE).
