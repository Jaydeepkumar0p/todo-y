import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import connect from "./db/db.js";
import auth from "./routes/auth.js";
import list from "./routes/list.js";

// Load environment variables
dotenv.config();

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Define API routes
app.use("/api/v1", auth);
app.use("/api/v2", list);

// Serve static frontend files
const frontendPath = path.resolve(__dirname, "../backend/frontend/dist"); // Adjusted path
app.use(express.static(frontendPath));

app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
});

app.use(express.static(frontendPath));

app.get("/", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    try {
        await connect(); // Ensure database connection is established
        console.log(`✅ Server is running on port: ${PORT}`);
    } catch (error) {
        console.error("❌ Database connection failed:", error);
    }
});
