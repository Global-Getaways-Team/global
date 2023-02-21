import { Request, Response } from "express";
import { db } from "../../config/db";

export const get = async (req: Request, res: Response) => {
	const { id } = req.params;
	const guest = await db.guest.findFirst({
		where: {
			id: id,
		},
	});

	res.contentType("application/json");
	res.status(200).json(guest);
};

export const create = async (req: Request, res: Response) => {
	const tenYears = new Date().getTime() + 10 * 365 * 24 * 60 * 60;
	const guest = await db.guest.create({
		data: {},
	});

	res.cookie("global_getaways_tracking_id", guest.id, {
		maxAge: tenYears,
		signed: true,
		sameSite: "none",
		secure: true,
	});

	res.contentType("application/json");
	res.status(201).json(guest);
};

export const list = async (req: Request, res: Response) => {
	const limit: number = parseInt(req.params.limit);
	const guests = await db.guest.findMany({ take: limit });
	res.contentType("application/json");
	res.status(200).json(guests);
};
