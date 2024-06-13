import * as process from "process";

const config = {
  mongodb: {
    uri: `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGO_PORT}/${process.env.MONGODB_DB}`
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: +process.env.REDIS_PORT
  }
};
export default config;
