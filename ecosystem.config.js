module.exports = {
  apps: [
    {
      name: 'frontend',
      cwd: './apps/studio',
      script: 'npm',
      args: 'start',
      env: {
        PORT: 3000,
        NODE_ENV: 'production',
      },
    },
    {
      name: 'backend',
      cwd: './apps/backend',
      script: 'npm',
      args: 'start',
      env: {
        PORT: 5173,
        NODE_ENV: 'production',
      },
    },
  ],
};
