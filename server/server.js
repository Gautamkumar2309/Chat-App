// import express from "express";
// import "dotenv/config";
// import cors from "cors";
// import http from "http";
// import { connectDB } from "./lib/db.js";

// dotenv.config();

// const app = express();
// const server = http.createServer(app)

// app.use(express.json({limit: "4mb"}));
// app.use(cors());

// app.use("/api/status", (req,res)=> res.send("Server is live"));

// //conect to mongdb
// await connectDB();

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, ()=> console.log("Server is running on port: " + PORT));
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";

dotenv.config(); // 👈 important

const app = express();
const server = http.createServer(app);

app.use(express.json({ limit: "4mb" }));
app.use(cors());

app.use("/api/status", (req, res) => res.send("Server is live"));

// connect to mongodb
await connectDB();

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});