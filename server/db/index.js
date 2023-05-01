import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

export const db = mysql.createPool({
    host: "us-cdbr-east-06.cleardb.net",
    user: "b817c218ada325",
    password: "7f016a0e",
    database: "heroku_afeaebc8ad8cfdc",
  });
