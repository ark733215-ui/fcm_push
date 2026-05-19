const express = require("express");
const admin = require("firebase-admin");

const app = express();

const serviceAccount =
require("./serviceAccountKey.json");

admin.initializeApp({
    credential:
    admin.credential.cert(serviceAccount)
});

app.get("/", (req, res) => {

    res.send("HOME OK");

});

app.get("/send/:id", async (req, res) => {

    try {

        return res.send("ROUTE OK");

    } catch (e) {

        return res.send(e.toString());
    }
});

app.listen(process.env.PORT || 3000);
