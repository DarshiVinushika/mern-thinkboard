import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/bd.js";
import dotenv from "dotenv";
import ratelimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

//middleware
if(process.env.NODE_ENV !== "production") {
  app.use(cors({
    origin: 'http://localhost:5173' // Adjust this to your frontend URL
  })
  );
}
app.use(express.json());
app.use(ratelimiter);

app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Frontend/dist")));
  
  app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend","dist", "index.html"));
  });
}



//To connect the database before running the port
connectDB().then(()=>{
  app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
  });
});

