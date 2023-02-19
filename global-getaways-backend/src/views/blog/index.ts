import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { db } from "../../config/db";

export const get = async (req: Request, res: Response) => {
	const { id } = req.params;
	const blog = await db.blog.findFirst({
		where: {
			id: id,
		},
	});

	res.contentType("application/json");
	res.status(200).json(blog);
};

export const create = async (req: Request, res: Response) => {
	const { body, city, country, image, title } = req.body;
	try {
		const blog = await db.blog.create({
			data: {
				body,
				city,
				country,
				image,
				title,
			},
		});
		res.contentType("application/json");
		res.status(201).json(blog);
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			if (e.code == "P2002") {
				res.contentType("application/json");
				res.status(409).json({ error: e });
			}
		}
	}
};

// list lists all the items in the database base with an limit
export const list = async (req: Request, res: Response) => {
	const limit: number = parseInt(req.params.limit);
	const blogs = await db.blog.findMany({ take: limit });
	res.contentType("application/json");
	res.status(200).json(blogs);
};

export const all = async (req: Request, res: Response) => {
	const blogs = await db.blog.findMany();
	res.contentType("application/json");
	res.status(200).json(blogs);
};

export const put = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { body, title, country, city, image } = req.body;
	const blog = await db.blog.update({
		where: {
			id,
		},
		data: {
			body,
			title,
			country,
			city,
			image,
		},
	});

	res.contentType("application/json");
	res.status(201).json(blog);
};

export const del = async (req: Request, res: Response) => {
	const { id } = req.params;
	const blog = await db.blog.delete({
		where: {
			id,
		},
	});

	res.contentType("application/json");
	res.status(204).json(blog.id);
};
