import connect from "@/Database/Connect";

export default async function handler(req, res) {
  const { id } = req.query;
  const db = connect();

  // READ
  if (req.method === "GET") {
    try {
      const result = await db.query(
        `SELECT * FROM ${process.env.DATABASE_SCHEMA || "public"}.tasks WHERE user_id = '${id}'`
      );
      res.status(200).json({ tasks: result.rows });
    } catch (e) {
      res.status(500).json({ error: e.message });
      console.error(e.message);
    }
  }

  // DELETE
  else if (req.method === "DELETE") {
    try {
      const result = await db.query(
        `DELETE FROM ${process.env.DATABASE_SCHEMA || "public"}.tasks
        WHERE id = '${id}'
        RETURNING *;`
      );
      const task = result.rows[0];
      res.status(200).json({ task });
    } catch (e) {
      res.status(500).json({ error: e.message });
      console.error(e.message);
    }
  }
}
