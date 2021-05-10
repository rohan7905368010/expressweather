const express = require("express");
const app = express();
const port = process.env.PORT || 8001;
const path = require("path");
const hbs = require("hbs");

//paths
const staticPath = path.join(__dirname,"../public");
const templatePath = path.join(__dirname,"../templates/views")
const partialPath = path.join(__dirname,"../templates/partials");

app.set("view engine","hbs");
app.set("views",templatePath);

hbs.registerPartials(partialPath);

//static path calling
app.use(express.static(staticPath));

//routing
app.get("/", (req,res) => {
    res.render("index");
});

app.get("/about", (req,res) => {
    res.render("about")
});

app.get("/weather", (req,res) => {
    res.render("weather");
});

app.get("*", (req,res) => {
    res.render("404",{
        errorMsg : "OOPS !! page not found"
    });
});

app.listen(port, () => {
    console.log("successfully made connection ON " + port);
});