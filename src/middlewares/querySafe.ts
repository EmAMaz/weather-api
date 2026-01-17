import { NextFunction, Request, Response } from "express";

export function querySafe(req: Request, res: Response, next: NextFunction) {
    const { location } = req.query;

    if (!location) {
        return res.status(400).json({ error: "Location is required" });
    }
    if(typeof location !== "string") {
        return res.status(400).json({ error: "Location must be a string" });
    }
    const cleanLocation = location.trim().toLowerCase().replace(/\s/, ' ');
    req.query.location = cleanLocation;
    
    next();
}