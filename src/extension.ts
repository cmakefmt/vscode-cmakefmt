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

// Resolves the cmakefmt executable path using the following priority:
//   1. cmakefmt.executablePath if set to anything other than the default "cmakefmt"
//   2. The platform-specific binary bundled in the extension's bin/ directory
//   3. "cmakefmt" on PATH (original behaviour)
function resolveExecutable(extensionPath: string): string {
  const configured = cfg<string>("executablePath");
  if (configured && configured !== "cmakefmt") {
    return configured;
  }
  const ext = process.platform === "win32" ? ".exe" : "";
  const target = `${process.platform}-${process.arch}`;
  const bundled = path.join(extensionPath, "bin", `cmakefmt-${target}${ext}`);
  if (fs.existsSync(bundled)) {
    return bundled;
  }
  return "cmakefmt";
}

function format(document: vscode.TextDocument, extensionPath: string): Promise<vscode.TextEdit[]> {
  return new Promise((resolve, reject) => {
    const executable = resolveExecutable(extensionPath);
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
          return await format(document, context.extensionPath);
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
