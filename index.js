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

    res.send("HOME OK");

});

app.get("/send/:id", async (req, res) => {

    try {

        const id = req.params.id;

        console.log("STEP 1");

        const ref =
        admin.database()
        .ref("FCM/" + id);

        console.log("STEP 2");

        const snapshot =
        await ref.once("value");

        console.log("STEP 3");

        const token = snapshot.val();

        console.log("TOKEN:", token);

        return res.send(token || "TOKEN NOT FOUND");

    } catch (e) {

        console.log("ERROR:", e);

        return res.send(e.toString());
    }
});

app.listen(process.env.PORT || 3000, () => {

    console.log("SERVER STARTED");

});
