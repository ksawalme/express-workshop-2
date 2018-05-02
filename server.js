

const exphbs = require("express-handlebars");
const express = require("express");
const app = express();
const fs = require('fs');
const filePath = __dirname + "/data/posts.json";
const savePost = require('./helpers/savePost');
const readPosts = require('./helpers/readPosts');


app.use(express.static("public"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // very impoetant to save the data


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

app.get('/posts', function(req, res){
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


app.get('/posts/:id', (req,res) => {
	let postId = req.params.id;
	fs.readFile(__dirname + "/data/posts.json", (error,file) => {
		if (error) {
			console.log(error);
		} else {
			let parsedFile = JSON.parse(file);
			parsedFile.forEach((post) => {
				if (post.id === postId) {
					res.send(post);
				};		
			});
		};
	});
});
     




// app.post("/admin", function(req, res) {
//   console.log(req.fields);
//   fs.readFile(__dirname + "/data/posts.json", function(error, file) {
//        parsedFile = JSON.parse(file);
//       console.log(parsedFile);
//       fs.writeFile(__dirname + "/data/posts.json",JSON.stringify(parsedFile), function(error) {
      
//       });

//   });

// });

// *****************

app.post("/posts", (req, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) throw err;
    var number = parseInt(JSON.parse(data)[0].id) + 1; 
    var Data = {
      id: number.toString(),
      title: req.body.title,
      summary: req.body.summary,
      content: req.body.content
    };
    savePost(Data);
    res.redirect("/admin");
  });
});

// *****************


// another METHODS

// app.post("/posts", (req, res) => {


//   var title= req.body.title;
//   var summary= req.body.summary;
//   var content= req.body.content

//     res.send(title + ' ' + summary + ' ' + content);

// });





app.listen(process.env.PORT || 3000, function() {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});

