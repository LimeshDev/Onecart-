import express from "express"
import cors from "cors"
import dotenv from 'dotenv'
import connectdb from './config/db.js'
import cookieParser from "cookie-parser";
import authRoute from "./Routes/authRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import productRoutes from "./Routes/productRoutes.js";
import cartRoutes from "./Routes/cartRoutes.js";
import orderRoutes from "./Routes/orderRoutes.js";
dotenv.config()

let port = process.env.PORT || 8000;
let app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: ["http://localhost:5175", "http://localhost:5174", "http://localhost:5176"], credentials: true }));


app.use('/api/auth', authRoute)
app.use('/api/user', userRoutes)
app.use("/api/product", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/order", orderRoutes)


app.get('/', (req, res) => {
    res.send("hello From server")
})
connectdb()
    .then((res) => {
        app.listen(port, () => {
            console.log("hello from server");
            connectdb()

        })
    })
    .catch((error)=> console.log( error))




