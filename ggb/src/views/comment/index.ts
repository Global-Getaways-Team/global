import { Request, Response } from "express";
import { db } from "../../config/db";

export const get = (req: Request, res: Response) => {
	const { id } = req.params;
	const comment = db.comment.findFirst({
		where: { id: id },
	});
	res.status(200).json(comment);
};

export const list = async (req: Request, res: Response) => {
	const { blogId } = req.params;
	const comments = await db.comment.findMany({
		where: {
			blogId: blogId,
		},
	});

	res.contentType("application/json");
	res.status(200).json(comments);
};

export const create = async (req: Request, res: Response) => {
	const { global_getaways_tracking_id } = req.signedCookies;
	const { body, blogId } = req.body;
	const comment = await db.comment.create({
		data: { body, authorId: global_getaways_tracking_id, blogId },
	});

	res.contentType("application/json");
	res.status(201).json(comment);
};

export const put = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { body } = req.body;
	const comment = await db.comment.update({
		where: {
			id,
		},
		data: {
			body,
		},
	});

	res.contentType("application/json");
	res.status(201).json(comment);
};

export const del = async (req: Request, res: Response) => {
	const { id } = req.params;
	const comment = await db.comment.delete({
		where: {
			id: id,
		},
	});

	res.contentType("application/json");
	res.status(204).json(comment.id);
};
