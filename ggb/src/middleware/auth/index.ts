import { Request, Response, NextFunction } from "express";

export const isGuest = (req: Request, res: Response, next: NextFunction) => {

	next();
};
