import { spawn } from 'child_process';

const port = process.env.PORT || '5174';

console.log('[System] Starting real-time backend server (server.js) on port 3000...');
const backend = spawn('node', ['server.js'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    PORT: '3000',
    BACKEND_PORT: '3000'
  }
});

backend.on('error', (err) => {
  console.error('[Backend Error]:', err);
});

console.log(`[System] Starting Vite frontend server on port ${port}...`);
const frontend = spawn('npx', ['vite', '--host', '--port', port], {
  stdio: 'inherit',
  shell: true,
  env: process.env
});

frontend.on('error', (err) => {
  console.error('[Frontend Error]:', err);
});

const cleanup = () => {
  try {
    backend.kill();
    frontend.kill();
  } catch (e) {}
  process.exit(0);
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
