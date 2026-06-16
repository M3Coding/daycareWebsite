//module dependencies
import express from 'express';
import bodyParser from 'body-parser';
import axios from "axios";
import bcrypt from "bcrypt";
import session from 'express-session';
import pg from "pg";
import passport from 'passport';
import { Strategy } from 'passport-local'
import GoogleStrategy from "passport-google-oauth2"
import 'dotenv/config';
import multer from "multer";
import path from 'path';






const app = express();
const port = 3000;
const saltRounds = 10;
let posts = []

//connect db
const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
});
db.connect();

//session config
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUnitialized:true,
  })
);

//Weather API-API Key-need to put api key in a .env file
const weather_API = "https://api.weatherapi.com/v1/forecast.json?";
const API_Key = process.env.WEATHER_API;

const  varnville = "q=29944";
const hampton = "q=29924";
const yemassee = "q=29945";
const estill = "q=29918";
const gifford = "q=29923";





//server config
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', './views'); 

//passport login config
app.use(passport.initialize());
app.use(passport.session())

//Multer Storage Config 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});
const upload = multer({storage});


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
//Login 
app.get('/login', (req, res) => {
  res.render('login.ejs')
})

//logout 
app.get("/logout", (req, res) => {
  req.logout(function (err) {
    if(err) {
      return next(err);

    }
    res.redirect("/");
  });
});
//render enrollement page
app.get('/enrollment', (req, res) => {
  res.render("enrollment.ejs");
});
//render teacher blog page
app.get('/teacherBlog', (req, res) => {
  console.log(req.user)
  if(req.isAuthenticated()) {
    console.log(posts)
    res.render("teacherBlog.ejs",{posts: posts})
  }else {
    res.redirect('/login')
  }
});


//Registration cconfiguration and routes
app.get('/registration', (req, res) =>{
  res.render("registration.ejs");
})

app.post('/registration', async (req, res) => {
  try{
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const password = req.body.password;

    console.log(fname, lname, email, password);
    try{
      const checkResult = await db.query("SELECT * FROM daycareusers WHERE email = $1", [email,
      ]);

      if (checkResult.rows.length > 0) {
        req.redirect("/registration");
      }else {
        bcrypt.hash(password, saltRounds, async (err, hash) => {
          if (err) {
            console.error("Error hashing password:", err);
          }else {
            const result = await db.query( "INSERT INTO daycareusers (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING *", [fname, lname, email, hash]);
            const user = result.rows[0];
            console.log(user);
            req.login(user, (err) => {
              console.log("success");
              res.redirect("/")
            });
          }
        });
      }

    }catch (err) {
      console.log(err);

    }

  } catch (error) {
    console.error("Error fetching registration information", error.message)
    res.render("registration.ejs", {error: "Unable to get registration information"} )
  }

})

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

//Login check 
passport.use("local", 
  new Strategy(async function verify(username, password, cb) {
    try{
      const result = await db.query("SELECT * FROM daycareusers WHERE email = $1", [username,]);
      if (result.rows.length > 0) {
        const user =result.rows[0];
        const storedHashedPassword = user.password;
        bcrypt.compare(password, storedHashedPassword, (err, valid) => {
          if(err) {
            //Error with password check
            console.error("Error comparing passwords:", err);
            return cb(err);
          }else {
            if(valid) {
              //Passed password check
              return cb(null, user);
            } else {
              //Failed password check 
              return cb(null, false);
            }
          }
        });
      } else {
        return cb("User not found")
      }
    } catch (err) {
      console.log(err);
    }
  })
);
//Blog post 

app.post("/submit", upload.single('postGraphic'), (req, res) => {
  const graphic = req.file.filename;
  
  
   var today = new Date()
    const newPost= {
        id: Date.now(),
        content: req.body.userPost,
        today: today,
        blogTitle: req.body.blogTitle,
        userName:req.body.userName,
        images: graphic

        };
        posts.push(newPost);
        console.log(newPost); 
    
    res.redirect("/teacherBlog");

  //store the file and then query the file.
})


app.post("/update", (req, res) => {
  const { id, content} = req.body;
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

//Passport User Authentication-maintain session
passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((user, cb) => {
  cb(null, user)
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});