import dotenv from 'dotenv'
import express from 'express'
import userRouter from './routes/users.js'
import likesRouter from "./routes/likes.js";
import commentRouter from "./routes/comments.js";
import postsRouter from "./routes/posts.js";
import authRouter from "./routes/auth.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer";
import relationshipRouter from "./routes/relationship.js"
import { db } from "./connection.js";

dotenv.config();

const app = express()
// middleware 
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Credentials", true)
    next()
})

app.use(express.json())

app.use("/upload", express.static("../social-media/public/upload"));

app.use(cors({
    origin:"http://localhost:3000",
}))
app.use(cookieParser())



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
     cb(null, "../social-media/public/upload");
     
   
  },
  filename: function (req, file, cb) {
  
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req , res)=>{
  const file = req.file

  res.status(200).json(file.filename)
})









app.use('/api/users',userRouter)
app.use("/api/posts", postsRouter);
app.use("/api/comments", commentRouter);
app.use("/api/likes", likesRouter);
app.use("/api/auth", authRouter);
app.use("/api/relationship", relationshipRouter);

const port = 8880

app.listen(port, ()=>{
    console.log(`app is running at ${port} `)
})