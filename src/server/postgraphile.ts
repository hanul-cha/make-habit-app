import { configSER, configDEV } from './config';
import { Pool } from 'pg';
import { postgraphile } from "postgraphile";

const config = configDEV 
/* 
  configSER : 실서비스용 데이터베이스
  configDEV : 로컬환경의 데이터베이스
  */

const pool = new Pool({
    user: config.DB_USER,
    host: config.DB_HOST,
    database: config.DB_DATABASE,
    password: config.DB_PASSWORD,
    port: config.DB_PORT,
});

const connection = `postgres://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_HOST}/${config.DB_DATABASE}`

export {pool as pg};

export default postgraphile(
  pool,
  "public",
  {
    graphiql: true,
    enhanceGraphiql: true,
    // externalUrlBase: "/api", // Don't use this since graphql route is incorrect w/ it
    graphqlRoute: "/api/graphql",
    graphiqlRoute: "/api/graphiql",
    retryOnInitFail: true, 
    // retryOnInitFail is mainly so that going to /api/graphiql 
    // doesn't crash entire app if config is incorrect. Fix config.
  }
);