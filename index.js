const express = require("express");
const admin = require("firebase-admin");

const app = express();

const serviceAccount =
require("./serviceAccountKey.json");

admin.initializeApp({

    credential:
    admin.credential.cert(serviceAccount),

    databaseURL:
    "https://rto-1-4b543-default-rtdb.firebaseio.com"
});

app.get("/", (req, res) => {

    res.send("SERVER RUNNING");

});

app.get("/send/:id", async (req, res) => {

    try {

        const androidID = req.params.id;

        console.log("ANDROID ID:", androidID);

        res.send("ROUTE WORKING");

    } catch (e) {

        console.log(e);

        res.send(e.toString());
    }
});

app.listen(process.env.PORT || 3000, () => {

    console.log("SERVER STARTED");

});
