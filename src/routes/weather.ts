import { Router } from "express";
import { WeatherController } from "../controllers/weatherController";
import { querySafe } from "../middlewares/querySafe";
import { CacheManager } from "../cache/cache-manager";

const router = Router();

const cacheManager = new CacheManager(process.env.REDIS_URL as string);
const weatherController = new WeatherController(cacheManager);

router.get("/", querySafe, weatherController.getWeatherByLocation);

export default router;