if (process.env.npm_execpath.includes('npm') && process.cwd() !== process.env.INIT_CWD) {
    // This means npm install was run from root, which is good.
    process.exit(0);
}

const path = require('path');
const fs = require('fs');

// Simple heuristic: look for workspace definitions in the current dir's package.json
// If NOT found, and we are not in root (heuristic: check if a parent has workspaces), then fail.

// Better approach:
// Just check if we are running 'install' and if the CWD is NOT the root.
// However, finding "Root" reliably can be tricky.
// We can assume that if this script is being run, it's inside a package.
// If the user ran 'npm install' inside 'apps/api', process.env.INIT_CWD will be '.../apps/api'.
// We want to force them to run it from '.../agentMonorepo'.

const initCwd = process.env.INIT_CWD || process.cwd();
const isRoot = fs.existsSync(path.join(initCwd, 'libs')) && fs.existsSync(path.join(initCwd, 'apps'));

if (!isRoot) {
    console.error('\x1b[31m%s\x1b[0m', 'Create Error: You must run "npm install" from the repository root.');
    console.error('Do not run npm install inside apps/ or libs/.');
    process.exit(1);
}
