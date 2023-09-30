export default () => ({
  api: {
    port: parseInt(process.env.API_REST_PORT, 10) || 3333,
  },
  cors: {
    whitelist: process.env.CORS_ORIGINS || '',
  },
  jwt: {
    secret: process.env.JWT_SECRET || '',
  },
});
