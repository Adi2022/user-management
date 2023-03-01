import  express  from "express";
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/users.js'
const app=express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());

app.use(cors());
app.use("/",userRoutes)

app.get("/",(req,res)=>{
    res.send("hello world");
})

app.all("*",(req,res)=>{
    res.send("That route doesnot exists")
})

app.listen(port,()=>{
    console.log(`Port: ${port}`);
})