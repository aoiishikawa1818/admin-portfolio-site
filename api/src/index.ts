import express from "express";

const app = express();
const port = 3001;

app.get("/", (_req, res) => {
  res.send("API server is running!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
