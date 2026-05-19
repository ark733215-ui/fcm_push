const express = require("express");

const app = express();

app.get("/", (req, res) => {

    res.send("HOME OK");

});

app.get("/send/:id", (req, res) => {

    const id = req.params.id;

    return res.send("ID = " + id);

});

app.listen(process.env.PORT || 3000, () => {

    console.log("SERVER STARTED");

});
