import express from "express";
import cors from "cors";
import AppError from "./utils/AppError";
import errorHandler from "./middleware/errorHandler";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/users", (req, res) => {
    try {

        //In case of request body, validate here. If invalid, return 400 error (Bad request)

        // Valid input – proceed
        res.json([
            { id: 1, name: "Amy", avatarUrl: "https://api.dicebear.com/7.x/thumbs/svg?seed=Alice" },
            { id: 2, name: "Ross", avatarUrl: "https://api.dicebear.com/7.x/thumbs/svg?seed=Alice" },
            { id: 3, name: "Chandler", avatarUrl: "https://api.dicebear.com/7.x/thumbs/svg?seed=Alice" },
            { id: 4, name: "Monica", avatarUrl: "https://api.dicebear.com/7.x/thumbs/svg?seed=Alice" },
            { id: 5, name: "Gunther", avatarUrl: "https://api.dicebear.com/7.x/thumbs/svg?seed=Alice" }
        ]);
    }
    catch (err) {
        debugger
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
          } else {
            res.status(500).json({ error: "Unknown error" });
          }          
    }
});

app.use(errorHandler);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});