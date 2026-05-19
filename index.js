const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("SERVER RUNNING");
});

app.get("/send/:id", async (req, res) => {

  const id = req.params.id;

  console.log("ID:", id);

  return res.send("ROUTE WORKING");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server Running");
});
