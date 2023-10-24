const express = require("express");

const app = express();

app.get("/test", async (req, res) => {
  await new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, 5000)
  );
  res.send("ok");
});

app.listen(5000, () => console.log("listening on 3000"));
