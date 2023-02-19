import { Request, Response, NextFunction } from "express";

export const isGuest = (req: Request, res: Response, next: NextFunction) => {
	const { global_getaways_tracking_id } = req.signedCookies;
	if (global_getaways_tracking_id === undefined) {
		throw Error("guest is not recognized. Call /api/guest/create first.");
	}
	next();
};
