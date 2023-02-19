import express, { Express } from "express";
import { favorite, blog, guest, comment } from "./routes";
import { isGuest } from "./middleware";
import { db, parseCfgFile, isCookieSignKeyEmpty } from "./config";
import cors from "cors";
import path from "path";
import cookieParser = require("cookie-parser");

const port: number = 8080;
const hostname: string = "0.0.0.0";
const app: Express = express();
const assets: string = path.join(__dirname, "../assets");
const prefixes = {
	assets: "assets",
	api: "api",
};

parseCfgFile();
if (isCookieSignKeyEmpty()) {
	throw Error(
		"COOKIE_SIGN_KEY is empty. Insert COOKIE_SIGN_KEY into your .env file like: COOKIE_SIGN_KEY=<random-hex-string>"
	);
}
// middleware
app.use(express.json());
app.use(
	cors({
		origin: true,
		methods: ["POST", "GET", "PUT", "DELETE"],
		credentials: true,
	})
);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SIGN_KEY));

// custome middleware
app.use(`/api/blog`, isGuest);
app.use(`/api/comment`, isGuest);
app.use(`/api/favorite`, isGuest);

// routes
app.use(`/${prefixes.api}/favorite`, favorite);
app.use(`/${prefixes.api}/comment`, comment);
app.use(`/${prefixes.api}/blog`, blog);
app.use(`/${prefixes.api}/guest`, guest);
app.use(`/${prefixes.assets}`, express.static(assets));

// start the server
const server = app.listen(port, hostname, () => {
	console.log(`Server: http://${hostname}:${port}`);
	console.log(`REST-API: http://${hostname}:${port}/${prefixes.api}`);
	console.log(`Assets: http://${hostname}:${port}/${prefixes.assets}`);
});

// gracefule shutdown
process.on("SIGINT", async () => {
	await db.$disconnect();
	server.close(() => {
		console.log("HTTP Server closed");
	});
});
