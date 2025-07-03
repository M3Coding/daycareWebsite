import express from 'express';
import bodyParser from 'body-parser';


const app = express();
const port = 3000;
let posts = [];

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render("index.ejs");
});
app.get('/staff', (req, res) => {
  res.render("staff.ejs");
});
app.get('/career', (req, res) => {
  res.render("career.ejs");
});
app.get('/enrollment', (req, res) => {
  res.render("enrollment.ejs");
});
app.get('/teacherBlog', (req, res) => {
  res.render("teacherBlog.ejs", {posts: posts});
});

app.post("/submit", (req, res) =>{
    var today = new Date()
    const newPost= {
        id: Date.now(),
        content: req.body.userPost,
        today: today,
        blogTitle: req.body.blogTitle,
        userName:req.body.userName

        };
        posts.push(newPost);
    
    res.redirect("/teacherBlog");
})
app.post("/update", (req, res) => {
  const { id, content } = req.body;
  const post = posts.find(p => p.id == id);
  if (post) {
    post.content = content;
  }
  res.sendStatus(200);
});
app.delete("/update", (req, res) => {
    const {id} = req.body;
  const index = posts.findIndex(p => p.id == id);

  if (index !== -1) {
    posts.splice(index, 1)
  }
  res.sendStatus(200);
    
})//this delete block of code req the id of the post. The array is indexed to find that id and if it matches the number then it deletes with the splice function.

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});