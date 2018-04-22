const exphbs = require("express-handlebars");

const express = require("express");
const app = express();
const router = express.Router();
var path    = require("path");

// Then these two lines after you initialise your express app
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.render("index", {
    title: "Khaled Profile" // insert your name instead
  });
});

app.get("/admin", (req, res) => {
  res.render("admin", {
    title: "Admin page" // insert your name instead

  });
});
app.get("/my-cv", (req, res) => {
  res.render("my-cv", {
    title: "My Refrance" // insert your name instead

  });
});
app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Call Me 07492936847" // insert your name instead
  });
});

app.get('/get-posts', function(req, res){
  res.sendFile(__dirname + '/data/posts.json')
})

// app.get('/Blog-Post',function(req,res, next){
//   res.render("Blog-Post");
//   next()
//   res.sendFile(__dirname + '/data/posts.json');
// });
app.get('/Blog-Post',function(req,res){
  res.sendFile(__dirname + '/data/posts.json');
});


// app.post('/endpoint', function(req, res){
// 	var obj = {};
// 	console.log(__dirname + '/data/posts.json');
// 	res.send(req.body);
// });




   
  
      
    
    
    
 

// The extensions 'html' allows us to serve file without adding .html at the end 
// i.e /my-cv will server /my-cv.html
app.use(express.static("public", { 'extensions': ['html'] }));


// what does this line mean: process.env.PORT || 3000
app.listen(process.env.PORT || 3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
