import * as dotenv from "dotenv";
dotenv.config();

export default {
  sqlite3: {
    client: "sqlite3",
    connection: {
      filename: process.env.SQLITE3_FILENAME,
    },
    useNullAsDefault: true,
  },
  mariaDb: {
    client: "mysql",
    connection: {
      host: process.env.MARIADB_HOST,
      user: process.env.MARIADB_USER,
      password: process.env.MARIADB_PASSWORD,
      database: process.env.MARIADB_DATABASE,
    },
  },
};
