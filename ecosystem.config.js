// Cấu hình PM2 cho triển khai trên VPS/Hostinger.
// Sử dụng: pm2 start ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "clouds-website",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      cwd: __dirname,
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
