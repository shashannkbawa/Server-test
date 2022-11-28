const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;
const sqlite3 = require('sqlite3').verbose();
let sql;

//Connection with database
const db = new sqlite3.Database("./Database.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
    console.log("connected")
})



// server css as static
app.use(express.static(__dirname));

app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/newUser", (req, res) => {
    console.log(req.body.firstName)
    sql = `INSERT INTO users(email,firstName,lastName,password) VALUES (?,?,?,?)`
    db.run(sql, [req.body.email, req.body.firstName, req.body.lastName, req.body.password], (err) => {
        if (err) return console.error(err.message)
    })

    res.send({
        data: "Correct"
    })
});

app.post("/toLogIn", (req, res) => {
    sql = `SELECT * FROM USERS;`
    db.all(sql, [], (err, rows) => {
        if (err) return console.error(err.message)

        rows.forEach(row => {
            if (row.email == req.body.email) {
                console.log("email is correct")
                if (row.password == req.body.password) return res.send({ data: row.firstName })

            }

        })
    })

})

app.post("/toContact", (req, res) => {
    console.log(req.body)
    sql = `INSERT INTO Contact (Name,email,message) VALUES (?,?,?)`
    db.run(sql, [req.body.name, req.body.email, req.body.message], (err) => {
        if (err) return console.error(err.message)
    })
    res.send({ data: "We will get in touch you through email soon" })
})

app.get("/getSignIn", (req, res) => {
    res.sendFile(__dirname, "./loginPage");

})
app.listen(port, () => {
    console.log("Application started and Listening on port 3000");
});
