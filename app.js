import express from "express";
import axios from "axios";
import path from "path";

const app = express();
const port = process.env.PORT || 3000;

app.set("views", path.join(process.cwd(), "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(process.cwd(), "public")));

app.get("/", (req, res) => {
    res.render("index");
});

// Home page
app.get("/random-topic", async (req, res) => {
    try {
        const category = req.query.category;

        const baseUrl = process.env.API_URL || "http://localhost:3001";
        let url = `${baseUrl}/api/topics/random`;

        if (category && category !== "all") {
            url += `?category=${category}`;
        }

        const result = await axios.get(url);

        res.json({
            topic: result.data.topic
        });

    } catch (error) {
        console.log("Error fetching topic:", error.message);

        res.status(500).json({
            error: "Could not get a topic"
        });
    }
});

if (process.env.NODE_ENV !== "production") {
    app.listen(port, () => {
        console.log(`Speaking app running on port ${port}`);
    });
}

export default app;