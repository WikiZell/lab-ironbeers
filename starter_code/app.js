/* 
npm init -y 
npm install express --save
npm install nodemon
*/

//require express
const express = require("express");
const exphbs = require("express-handlebars");
const PunkAPIWrapper = require("punkapi-javascript-wrapper");
const punkAPI = new PunkAPIWrapper();
var app = express();

app.engine(
  ".hbs",
  exphbs({
    extname: ".hbs",
    defaultLayout: "layout",
    partialsDir: __dirname + "/views/partials/"
  })
);

app.set("view engine", ".hbs");
app.use("/public", express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/beers", (req, res) => {
  punkAPI
    .getBeers()
    .then(beers => {
      res.render("beers", { beers, title: "Beers List" });
    })
    .catch(error => {
      console.log(error);
    });
});

app.get("/beers", (req, res) => {
  punkAPI
    .getBeers()
    .then(beers => {
      res.render("beers", { beers, title: "Beers List" });
    })
    .catch(error => {
      console.log(error);
    });
});

app.get("/getBeer", (req, res) => {
  punkAPI
    .getBeers()
    .then(beers => {
      let beer;
      beer = beers.filter((k, v) => {
        if (k.id == req.query.id) {
          return k
        }
      })

      res.render("random-beers", { beer, title: beer[0].name });

    })
    .catch(error => {
      console.log(error);
    });
});




app.get("/random-beers", (req, res) => {
  punkAPI
    .getRandom()
    .then(beer => {
      res.render("random-beers", { beer, title: "Random Beer !!" });
    })
    .catch(error => {
      console.log(error);
    });
});

app.listen(3000, () => {
  console.log("listening");
});
