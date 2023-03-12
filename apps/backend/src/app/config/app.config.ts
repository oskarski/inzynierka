export default () => ({
  port: parseInt(process.env.APP_PORT, 10) || 3000,
  allowedOrigins: process.env.ALLOWED_ORIGINS,
});
