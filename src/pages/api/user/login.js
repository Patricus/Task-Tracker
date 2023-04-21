import connect from "@/Database/Connect";

export default async function handler(req, res) {
  const user = req.body;
  const db = connect();

  if (req.method === "POST") {
    if (!user) {
      res.status(400).json({ error: "Name are required." });
      return;
    }

    // Query to database to get user data or create new user
    try {
      await db.query(
        `INSERT INTO ${
          process.env.DATABASE_SCHEMA || "public"
        }.users(name) SELECT '${user}' WHERE NOT EXISTS (SELECT 1 FROM ${
          process.env.DATABASE_SCHEMA || "public"
        }.users WHERE name = '${user}');`
      );

      const result = await db.query(
        `SELECT * FROM ${process.env.DATABASE_SCHEMA || "public"}.users WHERE name = '${user}'`
      );
      const resUser = result.rows[0];
      res.status(200).json({ user: resUser });
    } catch (e) {
      res.status(500).json({ error: e.message });
      console.error(e.message);
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
