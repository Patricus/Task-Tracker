import connect from "@/Database/Connect";

export default async function handler(req, res) {
  const { user, task } = req.body;
  const db = connect();

  // CREATE
  if (req.method === "POST") {
    if (!user.id) {
      res.status(400).json({ error: "Must be logged in." });
      return;
    }
    if (!task.title.length) {
      res.status(400).json({ error: "Title is required." });
      return;
    }
    if (!task.description.length) {
      res.status(400).json({ error: "Description is required." });
      return;
    }

    try {
      const result = await db.query(
        `INSERT INTO ${
          process.env.DATABASE_SCHEMA || "public"
        }.tasks (user_id, title, description, status, due_date)
            VALUES ('${user.id}', '${task.title}', '${task.description}', '${task.status}', '${
          task.dueDate
        }')
            RETURNING *;`
      );
      const newTask = result.rows[0];
      newTask.dueDate = task.due_date;
      res.status(200).json({ task: newTask });
    } catch (e) {
      res.status(500).json({ error: e.message });
      console.error(e);
    }
  }

  // UPDATE
  else if (req.method === "PUT") {
    try {
      const result = await db.query(
        `UPDATE ${process.env.DATABASE_SCHEMA || "public"}.tasks
        SET title = '${task.title}', description = '${task.description}', status = '${
          task.status
        }', due_date = '${task.dueDate}'
        WHERE id = '${task.id}'
        RETURNING *;`
      );
      res.status(200).json({ task: result.rows[0] });
    } catch (e) {
      res.status(500).json({ error: e.message });
      console.error(e.message);
    }
  }
}
