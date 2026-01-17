import express from "express";
import routerWeather from "./routes/weather";

const app = express();

app.use(express.json());
app.use("/weather", routerWeather);

export default app;