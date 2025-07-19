import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/bd.js";
import dotenv from "dotenv";
import ratelimiter from "./middleware/rateLimiter.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;


//middleware
app.use(cors({
  origin: 'http://localhost:5173' // Adjust this to your frontend URL
})
);
app.use(express.json());
app.use(ratelimiter);

app.use("/api/notes", notesRoutes);

//To connect the database before running the port
connectDB().then(()=>{
  app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
  });
});

