import { Pool } from "pg";

const pool = new Pool({
  user: "rodion",
  host: "80.78.240.158",
  database: "sphoto",
  password: "root",
  port: 5432
})

export default pool;

