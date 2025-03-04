import sql from 'mysql2'

export const db = sql.createConnection({
    database:"social",
    user:"social",
    password:"social123$",
    host:"localhost"

})