# vscode-cmakefmt

[![CI](https://github.com/cmakefmt/vscode-cmakefmt/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/cmakefmt/vscode-cmakefmt/actions/workflows/ci.yml)
[![VS Code Marketplace](https://img.shields.io/visual-studio-marketplace/v/cmakefmt.vscode-cmakefmt?label=VS%20Code%20Marketplace)](https://marketplace.visualstudio.com/items?itemName=cmakefmt.vscode-cmakefmt)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/cmakefmt.vscode-cmakefmt)](https://marketplace.visualstudio.com/items?itemName=cmakefmt.vscode-cmakefmt)

VS Code extension for [cmakefmt](https://cmakefmt.dev) — a fast, correct
CMake formatter written in Rust.

## Features

- **Format on save** — `CMakeLists.txt` and `.cmake` files are formatted
  automatically when saved
- **Format document** — trigger manually via the Command Palette
  (`Format Document`) or your keyboard shortcut
- **Config discovery** — `cmakefmt` automatically finds the nearest
  `.cmakefmt.yaml`, `.cmakefmt.yml`, or `.cmakefmt.toml` by walking up
  the directory tree — no configuration needed in VS Code settings
- **Configurable binary path** — point the extension at any `cmakefmt`
  installation
- **Extra arguments** — pass additional flags such as `--config-file`

## Install cmakefmt

The extension requires the `cmakefmt` binary on your `PATH`:

**Homebrew** (macOS):

```bash
brew install cmakefmt/cmakefmt/cmakefmt
```

**Cargo** (any platform):

```bash
cargo install cmakefmt-rust
```

**Pre-built binaries** — download from
[GitHub Releases](https://github.com/cmakefmt/cmakefmt/releases/latest).

Verify the installation:

```bash
cmakefmt --version
```

## Settings

| Setting                   | Default      | Description                                                                                 |
|---------------------------|--------------|---------------------------------------------------------------------------------------------|
| `cmakefmt.executablePath` | `"cmakefmt"` | Path to the `cmakefmt` binary. Only needed if `cmakefmt` is not on your `PATH`.             |
| `cmakefmt.extraArgs`      | `[]`         | Extra arguments passed to `cmakefmt` (e.g. `["--config-file", "/path/to/.cmakefmt.yaml"]`). |
| `cmakefmt.onSave`         | `true`       | Format CMake files automatically on save.                                                   |

> **Tip:** You usually don't need `extraArgs`. `cmakefmt` discovers your
> project config automatically from the file being formatted. Only use
> `--config-file` if you need to override the default discovery.

## Usage

1. Install the extension from the
   [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=cmakefmt.vscode-cmakefmt)
2. Open any `CMakeLists.txt` or `.cmake` file
3. Save the file — it is formatted automatically

To format without saving, open the Command Palette (`Ctrl+Shift+P` /
`Cmd+Shift+P`) and run **Format Document**.

### Disable format-on-save

The extension respects VS Code's built-in `editor.formatOnSave` setting
and also has its own `cmakefmt.onSave` toggle. To disable format-on-save,
either approach works:

```json
// .vscode/settings.json — disable for all formatters
{
  "editor.formatOnSave": false
}
```

```json
// .vscode/settings.json — disable only cmakefmt's format-on-save
{
  "cmakefmt.onSave": false
}
```

To disable format-on-save only for CMake files while keeping it for other
languages:

```json
{
  "[cmake]": {
    "editor.formatOnSave": false
  }
}
```

### Use a specific binary

```json
{
  "cmakefmt.executablePath": "/usr/local/bin/cmakefmt"
}
```

## Troubleshooting

**"cmakefmt not found"** — make sure `cmakefmt` is installed and on your
`PATH`. Run `cmakefmt --version` in the VS Code integrated terminal to
verify. If it works in your regular terminal but not in VS Code, set the
full path in `cmakefmt.executablePath`.

**Formatting does nothing** — check the Output panel (`View > Output`,
select "cmakefmt" from the dropdown) for error messages. Common causes:
the file has a parse error, or there is no `.cmakefmt.yaml` and the
defaults already match your code.

**Wrong config is used** — run `cmakefmt config path <file>` in a terminal
to see which config file `cmakefmt` discovers for a given file.

## Links

- [cmakefmt documentation](https://cmakefmt.dev)
- [Editor integration guide](https://cmakefmt.dev/editors/)
- [Config reference](https://cmakefmt.dev/config/)
- [GitHub](https://github.com/cmakefmt/cmakefmt)

## License

MIT OR Apache-2.0 — see [LICENSE](LICENSE).
