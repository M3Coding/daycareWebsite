import express from 'express';
import bodyParser from 'body-parser';
import axios from "axios";


const app = express();
const port = 3000;
const weather_API = "https://api.weatherapi.com/v1/forecast.json?";
const API_Key = "&key=4318854af23c46e09aa44845252907"

const  varnville = "q=29944";
const hampton = "q=29924";
const yemassee = "q=29945";
const estill = "q=29918";
const gifford = "q=29923";
let posts = [];

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', './views'); 
//render home page
app.get('/', async (req, res) => {
  try {
    const weather = await axios.get(weather_API + varnville + API_Key);
    res.render("index.ejs", {currentWeather: weather.data.current?.temp_f +"°F", icon: weather.data.current?.condition?.icon, condition: weather.data.forecast?.forecastday[0]?.day?.condition?.text, maxTemp: weather.data.forecast?.forecastday[0]?.day?.maxtemp_f, minTemp: weather.data.forecast?.forecastday[0]?.day?.mintemp_f });//integrated weather api 

  }catch (error) {
  console.error("Error fetching weather:", error.message);
  res.render("index.ejs", { weather: null, error: "Unable to load weather data." });
}

});

//render staff page
app.get('/staff', async (req, res) => {
  try {
    const weather = await axios.get(weather_API + varnville + API_Key);
    res.render("staff.ejs", {currentWeather: weather.data.current?.temp_f +"°F", icon: weather.data.current?.condition?.icon, condition: weather.data.forecast?.forecastday[0]?.day?.condition?.text, maxTemp: weather.data.forecast?.forecastday[0]?.day?.maxtemp_f, minTemp: weather.data.forecast?.forecastday[0]?.day?.mintemp_f });//integrated weather api 

  }catch (error) {
  console.error("Error fetching weather:", error.message);
  res.render("index.ejs", { weather: null, error: "Unable to load weather data." });
}
  
});

//render career page
app.get('/career', async (req, res) => {
  try {
    const weather = await axios.get(weather_API + varnville + API_Key);
    res.render("career.ejs", {currentWeather: weather.data.current?.temp_f +"°F", icon: weather.data.current?.condition?.icon, condition: weather.data.forecast?.forecastday[0]?.day?.condition?.text, maxTemp: weather.data.forecast?.forecastday[0]?.day?.maxtemp_f, minTemp: weather.data.forecast?.forecastday[0]?.day?.mintemp_f });//integrated weather api 

  }catch (error) {
  console.error("Error fetching weather:", error.message);
  res.render("index.ejs", { weather: null, error: "Unable to load weather data." });
}
  
});
//render enrollement page
app.get('/enrollment', (req, res) => {
  res.render("enrollment.ejs");
});
//render teacher blog page
app.get('/teacherBlog', (req, res) => {
  res.render("teacherBlog.ejs", {posts: posts});
});

//Weather Api Integration into header 
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