/**
 * Install methods — the real ways to get WrongTrace running, taken from the
 * WrongTrace README. Each tab shows one copyable command, what it does, and
 * the verification step that proves it worked.
 */

export type InstallTabId = "go-install" | "from-source" | "run";

export type InstallTab = {
  id: InstallTabId;
  /** The tab label. */
  label: string;
  /** The command a visitor copies. */
  command: string;
  /** What this method actually does. */
  description: string;
  /** The command that proves the install worked. */
  verify: string;
  /** What the verification output tells you. */
  verifyNote: string;
};

export const installSection = {
  label: "11 · INSTALL",
  kicker: "ONE COMMAND, THEN YOU'RE IN",
  headline: ["Up and running", "in one line."],
  sub: "WrongTrace is a Go binary. Install it, start it against a repository, and the dashboard comes up on localhost.",
  tabs: [
    {
      id: "go-install",
      label: "Go install",
      command: "go install github.com/wrongstack/wrongtrace/cmd/wrongtrace@latest",
      description:
        "The shortest path if you already have Go 1.25 or newer on the machine. It fetches the module, builds the binary and drops it in your Go bin directory, which is on your PATH after you run go install.",
      verify: "wrongtrace --version",
      verifyNote: "Prints the version you just installed.",
    },
    {
      id: "from-source",
      label: "From source",
      command:
        "git clone https://github.com/wrongstack/wrongtrace && cd wrongtrace && go build ./cmd/wrongtrace",
      description:
        "Clone the repository and build the binary yourself. Use this when you want to read the source before you run it, or when you need to change it. The built binary lands in the working directory.",
      verify: "./wrongtrace --version",
      verifyNote: "Confirms the binary you just built runs.",
    },
    {
      id: "run",
      label: "Run the daemon",
      command: "wrongtrace start",
      description:
        "Starts the observer, the file watcher and the embedded dashboard against the repository in the current directory. The dashboard listens on port 3444 by default and binds to localhost.",
      verify: "open http://localhost:3444",
      verifyNote: "The dashboard. You can also run wrongtrace doctor to check the install.",
    },
  ] satisfies readonly InstallTab[],
} as const;
