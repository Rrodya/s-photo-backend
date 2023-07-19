import { Pool } from "pg";

const pool = new Pool({
  user: "rodion",
  host: "localhost",
  database: "sphoto",
  password: "root",
  port: 5432
})

export default pool;

