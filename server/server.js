const express = require("express");
const app = express();

const db = require("./database");

const HTTP_PORT = 8000;

app.listen(HTTP_PORT, () => {
  console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT));
});

app.post("/login", (req, res, next) => {
  var insert = "INSERT INTO login_data (nim, password) VALUES (?,?)";
  db.run(insert, [req.body.nim, md5(req.body.password)]);

  res.json({ message: "Ok" });
});

app.get("/datas", (req, res, next) => {
  const sql = "select * from login_data";
  const params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

app.use(function (req, res) {
  res.status(404);
});
