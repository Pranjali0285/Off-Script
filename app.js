import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index");
});

// Home page
app.get("/random-topic", async (req, res) => {
    try {
        const category = req.query.category;

        let url = "http://localhost:3001/api/topics/random";

        if (category && category !== "all") {
            url += `?category=${category}`;
        }

        const result = await axios.get(url);

        res.json({
            topic: result.data.topic
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Could not get a topic"
        });
    }
});

app.listen(port, () => {
    console.log(`Speaking app running on port ${port}`);
});