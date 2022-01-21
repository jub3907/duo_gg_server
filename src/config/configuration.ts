export default () => ({
  port: process.env.PORT || 3333,
  db: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`,
  api: {
    key: process.env.API_KEY,
    base: 'https://kr.api.riotgames.com/',
  },
});
