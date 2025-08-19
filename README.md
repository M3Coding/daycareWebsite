

# Children's Keeper Learning Center Website

🌐 **[www.childrenskeeperlc.com](http://www.childrenskeeperlc.com)**
A modern, responsive daycare website powered by **Node.js**, **Express**, **EJS**, and **Bootstrap**, with integrated weather updates and a blog feature for teachers and staff.

---

## 📌 Project Overview

The Children’s Keeper Learning Center website is a dynamic web application designed to provide parents, staff, and visitors with up-to-date information about the daycare’s offerings, staff, careers, and enrollment options. The site is styled using Bootstrap and built with vanilla **HTML**, **CSS**, and **JavaScript**, alongside **Express.js** and **Node.js** on the backend.

### 🌦 Key Feature:

Real-time **weather integration** using the [WeatherAPI](https://www.weatherapi.com/), showing daily conditions for the daycare's local area (Varnville, SC).

---

## 💡 Features

* 🌤 Live weather display with temperature, icon, and forecast
* 📄 Dynamic pages for:

  * Home
  * Staff introduction
  * Enrollment information
  * Career opportunities
  * Teacher blog
* 📝 Teacher Blog:

  * Add, update, and delete posts
  * Posts include blog title, content, date, and author
* ⚙️ Built-in RESTful routes
* 🎨 Responsive design using Bootstrap 5
* 📦 Static assets served from `/public` folder

---

## 🛠️ Tech Stack

| Layer              | Technology                                                                    |
| ------------------ | ----------------------------------------------------------------------------- |
| Frontend           | HTML, CSS, JavaScript, Bootstrap                                              |
| Backend            | Node.js, Express.js                                                           |
| Template Engine    | EJS                                                                           |
| Weather API        | WeatherAPI (weatherapi.com)                                                   |
| Hosting/Deployment | Custom domain ([www.childrenskeeperlc.com](http://www.childrenskeeperlc.com)) |
| Version Control    | Git / GitHub                                                                  |

---

## 📂 Project Structure

```
.
├── public/               # Static assets (CSS, JS, images)
├── views/                # EJS templates for each page
├── index.js              # Main Express server file
├── package.json
└── README.md
```

---

## 🚀 Getting Started (Development)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/childrenskeeperlc.git
cd childrenskeeperlc
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Environment (Optional)

If you plan to use environment variables, set them in a `.env` file.

### 4. Run the Server

```bash
node index.js
```

> Visit `http://localhost:3000` in your browser.

---

## 📬 API Usage

Weather is fetched from:

```
GET https://api.weatherapi.com/v1/forecast.json?q=29944&key=YOUR_API_KEY
```

Make sure to replace `YOUR_API_KEY` with your actual API key in the code.

---

## ✏️ Blog Post Handling

* **Add Post**: `/submit` (POST)
* **Edit Post**: `/update` (POST)
* **Delete Post**: `/update` (DELETE)

Posts are stored in memory during the runtime (no database).

---

## 📢 Live Site

Visit the live website:
🔗 **[www.childrenskeeperlc.com](http://www.childrenskeeperlc.com)**

---

## 👨‍💻 Developer

Created by **Matthew Eady**, founder of **Coding 4 Life Corp**, committed to building tech solutions that empower communities.

📧 Contact: [codinglife@gmail.com](mailto:codinglife@gmail.com)
🌐 [www.coding4lifecorp.com](http://www.coding4lifecorp.com)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

