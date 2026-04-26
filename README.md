# vscode-cmakefmt

[![CI](https://github.com/cmakefmt/vscode-cmakefmt/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/cmakefmt/vscode-cmakefmt/actions/workflows/ci.yml)
[![VS Code Marketplace](https://vsmarketplacebadges.dev/version/cmakefmt.vscode-cmakefmt.svg)](https://marketplace.visualstudio.com/items?itemName=cmakefmt.vscode-cmakefmt)
[![Installs](https://vsmarketplacebadges.dev/installs-short/cmakefmt.vscode-cmakefmt.svg)](https://marketplace.visualstudio.com/items?itemName=cmakefmt.vscode-cmakefmt)

VS Code extension for [cmakefmt](https://cmakefmt.dev) — a fast, correct
CMake formatter written in Rust.

## Features

- **Format document** — trigger manually via the Command Palette
  (`Format Document`) or your keyboard shortcut
- **Format on save** — opt in via VS Code's standard
  `editor.formatOnSave` setting (see below)
- **Config discovery** — `cmakefmt` automatically finds the nearest
  `.cmakefmt.yaml`, `.cmakefmt.yml`, or `.cmakefmt.toml` by walking up
  the directory tree — no configuration needed in VS Code settings
- **Configurable binary path** — point the extension at any `cmakefmt`
  installation
- **Extra arguments** — pass additional flags such as `--config-file`

## Getting started

### 1. Install the extension

Click **Install** on this page, or search for **cmakefmt** in the
Extensions view (`Ctrl+Shift+X` / `Cmd+Shift+X`).

### 2. Install cmakefmt

The extension requires the `cmakefmt` binary. Install it using one of
these methods:

| Method                   | Command                                                                               |
|--------------------------|---------------------------------------------------------------------------------------|
| **Homebrew** (macOS)     | `brew install cmakefmt/cmakefmt/cmakefmt`                                             |
| **pip** (any platform)   | `pip install cmakefmt`                                                                |
| **Cargo** (any platform) | `cargo install cmakefmt-rust`                                                         |
| **Pre-built binaries**   | [Download from GitHub Releases](https://github.com/cmakefmt/cmakefmt/releases/latest) |

Verify the installation:

```bash
cmakefmt --version
```

### 3. Format a file

Open any `CMakeLists.txt` or `.cmake` file, then open the Command
Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`) and run **Format Document**.

To format on save, enable VS Code's built-in `editor.formatOnSave`
(see [Format on save](#format-on-save) below).

## Settings

| Setting                   | Default      | Description                                                                                 |
|---------------------------|--------------|---------------------------------------------------------------------------------------------|
| `cmakefmt.executablePath` | `"cmakefmt"` | Path to the `cmakefmt` binary. Only needed if `cmakefmt` is not on your `PATH`.             |
| `cmakefmt.extraArgs`      | `[]`         | Extra arguments passed to `cmakefmt` (e.g. `["--config-file", "/path/to/.cmakefmt.yaml"]`). |

> **Tip:** You usually don't need `extraArgs`. `cmakefmt` discovers your
> project config automatically from the file being formatted. Only use
> `--config-file` if you need to override the default discovery.

### Format on save

Format-on-save uses VS Code's built-in `editor.formatOnSave` setting.
Enable it globally, or scope it to CMake files:

```jsonc
// .vscode/settings.json
{
  "[cmake]": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "cmakefmt.vscode-cmakefmt"
  }
}
```

To disable it for CMake files only without touching the global setting,
set `editor.formatOnSave` to `false` in the `[cmake]` scope.

### Use a specific binary

If `cmakefmt` is not on your `PATH`, set the full path:

```jsonc
// .vscode/settings.json
{
  "cmakefmt.executablePath": "/usr/local/bin/cmakefmt"
}
```

## Troubleshooting

**"cmakefmt not found"** — make sure `cmakefmt` is installed and on your
`PATH`. Run `cmakefmt --version` in the VS Code integrated terminal to
verify. If it works in your regular terminal but not in VS Code, set the
full path in `cmakefmt.executablePath`.

**Formatting does nothing** — the file may have a syntax error that
prevents formatting, or there is no `.cmakefmt.yaml` and the defaults
already match your code. Check for error notifications in the bottom-right
corner of VS Code after saving.

**Wrong config is used** — run `cmakefmt config path <file>` in a terminal
to see which config file `cmakefmt` discovers for a given file.

## Links

- [cmakefmt documentation](https://cmakefmt.dev)
- [Editor integration guide](https://cmakefmt.dev/editors/)
- [Config reference](https://cmakefmt.dev/config/)
- [GitHub](https://github.com/cmakefmt/cmakefmt)

## License

MIT OR Apache-2.0 — see [LICENSE](LICENSE).
