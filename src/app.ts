import express from "express";
import routerWeather from "./routes/weather";
import rateLimit from "express-rate-limit";

const app = express();
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: "Too many requests, please try again after 15 minutes",
    standardHeaders: true,
    legacyHeaders: false,
})

app.use(limiter);
app.use(express.json());
app.use("api/weather", routerWeather);

export default app;