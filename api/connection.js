import sql from 'mysql2'
import "dotenv/config";

export const db = sql.createConnection({
    database:process.env.DATABASE,
    user:process.env.USER,
    password:process.env.PASSWORD,
    host:process.env.HOST

})