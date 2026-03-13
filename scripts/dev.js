import { spawn } from "node:child_process";

const processes = [];

const spawnProcess = (name, command, args, options = {}) => {
    const child = spawn(command, args, {
        stdio: "inherit",
        ...options,
    });

    child.on("exit", (code) => {
        if (code !== 0) {
            process.exitCode = code ?? 1;
        }

        shutdown(child);
    });

    processes.push(child);
    return child;
};

const runNpmScript = (name, scriptName) => {
    if (process.platform === "win32") {
        return spawnProcess(name, "cmd.exe", ["/d", "/s", "/c", `npm.cmd run ${scriptName}`]);
    }

    return spawnProcess(name, "npm", ["run", scriptName]);
};

const shutdown = (origin) => {
    for (const child of processes) {
        if (child !== origin && !child.killed) {
            child.kill("SIGINT");
        }
    }
};

process.on("SIGINT", () => {
    shutdown();
    process.exit(0);
});

process.on("SIGTERM", () => {
    shutdown();
    process.exit(0);
});

runNpmScript("server", "dev:server");
runNpmScript("vite", "dev:vite");
