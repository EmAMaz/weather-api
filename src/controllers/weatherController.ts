import { Request, Response } from "express";
import { CacheManager } from "../cache/cache-manager";

interface propsFetch {
  location: string;
}

export class WeatherController {
  constructor(private readonly cacheManager: CacheManager) {}

  private fetchWeather = async ({ location }: propsFetch) => {
    try {
      const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=${process.env.KEY_API}&contentType=json`;

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };

  getWeatherByLocation = async (req: Request, res: Response) => {
    const { location } = req.query;

    try {
      const cachedData = await this.cacheManager.get(location as string);
      if (cachedData) {
        return res.status(200).json({
          source: "cache",
          redis: cachedData,
        });
      }

      const data = await this.fetchWeather({ location: location as string });

      const expirationMs = 60 * 60 * 1000; // 1 hour in milliseconds
      await this.cacheManager.set(location as string, data, { expirationMs });

      return res.status(200).json({
        source: "api",
        api: data,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "An unknown error occurred";
      if (res.headersSent) {
        return;
      }

      return res.status(500).json({ message });
    }
  };
}
