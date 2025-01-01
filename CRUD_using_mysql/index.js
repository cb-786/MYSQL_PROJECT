const { faker } = require('@faker-js/faker');
const express = require("express");
const port = 8080;
const app= express();
const path = require("path");
const mysql = require("mysql2");
var methodOverride = require('method-override');
app.use(methodOverride('_method'));
const { v4: uuidv4 } = require("uuid");

app.use(express.urlencoded({ extended: true }));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

const connection = mysql.createConnection({
            host:"localhost",
            user: "root",
            database: "mysql2",
            password: "uganadan"
})

let getuser =   () => {
    return [
       faker.string.uuid(),
       faker.internet.username(), // before version 9.1.0, use userName()
       faker.internet.email(),
       faker.internet.password()
    ];
  }

  app.get("/",(req,res)=> {
      let q = "SELECT count(*) FROM user";
      connection.query(q, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Database error");
            }
            let count = results[0]["count(*)"];
            res.render("home",{count});
        }) 
  })
  

  app.get("/users",(req,res)=> {
    let q = "SELECT * FROM user";
    connection.query(q, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Database error");
            }
            let users = results;
            console.log(results);
            res.render("users",{users});
            })

  })

  app.get("/user/:id/edit",(req,res)=> {
    let {id} = req.params;
    let q = "SELECT * FROM user WHERE id = ?";
    connection.query(q,id, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Database error");
            }
            let user = results[0];
            res.render("edit",{user});
            })

  })

  app.patch("/users/:p", (req, res) => {
    let { p } = req.params;
    let { username, password } = req.body;

    let q2 = `SELECT password FROM user WHERE id = ?`;

    connection.query(q2, [p], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Database error" });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: "User  not found" });
        }

        if (password !== result[0].password) {
            
            return res.status(400).send("Passwords do not match");
        } else {
            let q = `UPDATE user SET username = ? WHERE id = ? AND password=?`;
            connection.query(q, [username, p, password], (err, results) => {
                if (err) {
                    console.error("Database error:", err.message);
                    return res.status(500).send("Database error: " + err.message);
                }
                console.log(results);
                res.redirect("/users");
            });
        }
    });
});

app.get("/user/new", (req, res) => {
    res.render("new.ejs");
  });
  
  app.post("/user/new", (req, res) => {
    let { username, email, password } = req.body;
    let id = uuidv4();
    //Query to Insert New User
    let q = `INSERT INTO user (id, username, email, password) VALUES ('${id}','${username}','${email}','${password}') `;
  
    try {
      connection.query(q, (err, result) => {
        if (err) throw err;
        console.log("added new user");
        res.redirect("/users");
      });
    } catch (err) {
      res.send("some error occurred");
    }
  });
  
  app.get("/user/:id/delete", (req, res) => {
    let { id } = req.params;
    let q = `SELECT * FROM user WHERE id='${id}'`;
  
    try {
      connection.query(q, (err, result) => {
        if (err) throw err;
        let user = result[0];
        res.render("delete.ejs", { user });
      });
    } catch (err) {
      res.send("some error with DB");
    }
  });
  
  app.delete("/user/:id/", (req, res) => {
    let { id } = req.params;
    let { password } = req.body;
    let q = `SELECT * FROM user WHERE id='${id}'`;
  
    try {
      connection.query(q, (err, result) => {
        if (err) throw err;
        let user = result[0];
  
        if (user.password != password) {
          res.send("WRONG Password entered!");
        } else {
          let q2 = `DELETE FROM user WHERE id='${id}'`; //Query to Delete
          connection.query(q2, (err, result) => {
            if (err) throw err;
            else {
              console.log(result);
              console.log("deleted!");
              res.redirect("/users");
            }
          });
        }
      });
    } catch (err) {
      res.send("some error with DB");
    }
  });

        

    
 

  app.listen(port,(req,res)=> {
    console.log(`server is running on port ${port}`);
  })

// let data =[];
// for (let i = 1; i <= 100; i++) {
//   data.push(getuser());
// }



// let q = 'INSERT INTO user (id, username, email, password) VALUES ?';




// try {
//   connection.query(q, [data], (err, result) => {
//     if (err) throw err;
//     console.log(result);
//   });
// } catch (err) {
//   console.log(err);
// }