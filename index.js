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

    console.log("STEP 1");

    const ref =
      admin.database().ref("FCM/" + androidID);

    console.log("STEP 2");

    const snapshot =
      await Promise.race([

        ref.once("value"),

        new Promise((_, reject) =>
          setTimeout(() =>
            reject("FIREBASE TIMEOUT"), 5000))
      ]);

    console.log("STEP 3");

    const token = snapshot.val();

    return res.send(token || "TOKEN NOT FOUND");

  } catch (e) {

    console.log(e);

    return res.send(e.toString());
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server Running");
});
