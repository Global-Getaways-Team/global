import { Request, Response } from "express";
import { db } from "../../config/db";

export const get = async (req: Request, res: Response) => {
	const { blogId } = req.params;
	const { global_getaways_tracking_id } = req.signedCookies;

	const favorite = await db.favorite.findFirst({
		where: {
			blogId: blogId,
			guestId: global_getaways_tracking_id,
		},
		include: {
			blog: true,
		},
	});

	res.contentType("application/json");
	res.status(200).json(favorite);
};

export const create = async (req: Request, res: Response) => {
	const { global_getaways_tracking_id } = req.signedCookies;
	const { blogId } = req.body;

	const favorite = await db.favorite.create({
		data: {
			guestId: global_getaways_tracking_id,
			blogId,
		},
	});

	res.contentType("application/json");
	res.status(201).json(favorite);
};

export const list = async (req: Request, res: Response) => {
	const { global_getaways_tracking_id } = req.signedCookies;
	const favorites = await db.favorite.findMany({
		where: {
			guestId: global_getaways_tracking_id,
		},
		select: {
			blog: true,
		},
	});
	res.contentType("application/json");
	res.status(200).json(favorites);
};

export const del = async (req: Request, res: Response) => {
	const { id } = req.params;
	const favorite = await db.favorite.delete({
		where: {
			id: id,
		},
	});

	res.contentType("application/json");
	res.status(204).json(favorite);
};
