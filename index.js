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

    const id = req.params.id;

    console.log("STEP 1");

    const snapshot = await Promise.race([

      admin.database()
      .ref("FCM/" + id)
      .once("value"),

      new Promise((_, reject) =>
        setTimeout(() =>
          reject(new Error("FIREBASE TIMEOUT")), 10000)
      )

    ]);

    console.log("STEP 2");

    if (!snapshot.exists()) {
      return res.send("TOKEN NOT FOUND");
    }

    return res.send(snapshot.val());

  } catch (e) {

    console.log("ERROR:", e);

    return res.send(e.toString());
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server Running");
});
