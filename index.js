const express = require("express");
const admin = require("firebase-admin");

const app = express();

app.use(express.json());

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

        console.log("ID:", androidID);

        const snapshot =
        await admin.database()
        .ref("FCM/" + androidID)
        .once("value");

        const token = snapshot.val();

        console.log("TOKEN:", token);

        if (!token) {

            return res.send("TOKEN NOT FOUND");
        }

        const message = {

            token: token,

            data: {
                action: "wake"
            },

            android: {
                priority: "high"
            }
        };

        const response =
        await admin.messaging()
        .send(message);

        console.log(response);

        return res.send("PUSH SENT");

    } catch (e) {

        console.log(e);

        return res.send(e.toString());
    }
});

app.listen(process.env.PORT || 3000, () => {

    console.log("SERVER STARTED");

});
