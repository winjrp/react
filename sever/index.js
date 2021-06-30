const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");


app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "test",
});

app.get("/getdata", (req, res) => {
    db.query("SELECT * FROM data", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

app.post("/insertdata", (req, res) => {
    const name = req.body.Name;
 
    db.query("INSERT INTO data (name) VALUES(?)",
        [name], (err, result) => {
            if (err) {
                console.log(err)
            }
            else {
                res.send("value send")
            }
        })
})

app.put("/updatedata", (req, res) => {
    const id = req.body.ID;
    const name = req.body.Name;
 
    db.query("UPDATE data SET Name = ?  WHERE ID = ? ",
        [name,id], (err, result) => {
            if (err) {
                console.log(err)
            }
            else {
                res.send("value send")
            }
        })
})

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM data WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });






app.listen(3001, () => {
    console.log("Yey, your server is running on port 3001");
});