export type Blog = {
	id?: string;
	country: string;
	city: string;
	image: string;
	title: string;
	body: string;
	createdAt?: Date;
};

export type Link = {
	href: string;
	text: string;
	icon?: string;
};

export type Comment = {
	id?: string;
	createdAt?: Date;
	body: string;
	blogId: string;
	authorId?: string;
};

export type Favorite = {
	id?: string;
	createdAt?: Date;
	blogId?: string;
	guestId?: string;
};

export type Guest = {
	id?: string;
	createdAt?: Date;
	revisited?: Date;
	left?: Date;
	durationOfLastVisit?: number;
};
