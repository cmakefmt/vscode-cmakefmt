// SPDX-FileCopyrightText: Copyright 2026 Puneet Matharu
//
// SPDX-License-Identifier: MIT OR Apache-2.0

import * as cp from "child_process";
import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

function cfg<T>(key: string): T {
  return vscode.workspace.getConfiguration("cmakefmt").get<T>(key) as T;
}

// Maps process.platform + process.arch to the VS Code target name used when
// naming bundled binaries (e.g. "linux-x64", "darwin-arm64", "win32-x64").
function platformTarget(): string {
  const archMap: Partial<Record<string, string>> = { x64: "x64", arm64: "arm64", arm: "armhf" };
  const arch = archMap[process.arch] ?? "x64";
  if (process.platform === "darwin") { return `darwin-${arch}`; }
  if (process.platform === "win32") { return `win32-${arch}`; }
  return `linux-${arch}`;
}

// Resolution order:
//   1. User-configured executablePath (if changed from the default "cmakefmt")
//   2. Bundled binary shipped with this .vsix (bin/cmakefmt-<target>[.exe])
//   3. "cmakefmt" on PATH (original behaviour)
function resolveBinary(context: vscode.ExtensionContext): string {
  const configured: string = cfg("executablePath") || "cmakefmt";
  if (configured !== "cmakefmt") {
    return configured;
  }
  const ext = process.platform === "win32" ? ".exe" : "";
  const bundled = path.join(context.extensionPath, "bin", `cmakefmt-${platformTarget()}${ext}`);
  if (fs.existsSync(bundled)) {
    return bundled;
  }
  return "cmakefmt";
}

function format(document: vscode.TextDocument, context: vscode.ExtensionContext): Promise<vscode.TextEdit[]> {
  return new Promise((resolve, reject) => {
    const executable: string = resolveBinary(context);
    const extraArgs: string[] = cfg("extraArgs") || [];
    const args = [...extraArgs, "--stdin-path", document.fileName, "-"];

    const proc = cp.spawn(executable, args, {
      cwd: vscode.workspace.getWorkspaceFolder(document.uri)?.uri.fsPath,
    });

    let stdout = "";
    let stderr = "";

    proc.stdout.on("data", (chunk: Buffer) => { stdout += chunk.toString(); });
    proc.stderr.on("data", (chunk: Buffer) => { stderr += chunk.toString(); });

    proc.on("error", (err) => {
      if ((err as NodeJS.ErrnoException).code === "ENOENT") {
        reject(
          new Error(
            `cmakefmt executable not found: "${executable}". ` +
            `Install it with 'cargo install cmakefmt-rust' or set cmakefmt.executablePath.`,
          ),
        );
      } else {
        reject(err);
      }
    });

    proc.on("close", (code) => {
      if (code !== 0) {
        // Surface stderr as a user-visible error message
        reject(new Error(stderr.trim() || `cmakefmt exited with code ${code}`));
        return;
      }
      const fullRange = new vscode.Range(
        document.lineAt(0).range.start,
        document.lineAt(document.lineCount - 1).range.end,
      );
      resolve([vscode.TextEdit.replace(fullRange, stdout)]);
    });

    proc.stdin.write(document.getText());
    proc.stdin.end();
  });
}

export function activate(context: vscode.ExtensionContext): void {
  const formatter = vscode.languages.registerDocumentFormattingEditProvider(
    { language: "cmake" },
    {
      async provideDocumentFormattingEdits(
        document: vscode.TextDocument,
      ): Promise<vscode.TextEdit[]> {
        try {
          return await format(document, context);
        } catch (err) {
          vscode.window.showErrorMessage(String(err));
          return [];
        }
      },
    },
  );

  context.subscriptions.push(formatter);
}

export function deactivate(): void {
  // nothing to clean up
}
