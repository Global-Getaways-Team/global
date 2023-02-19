import * as dotenv from "dotenv";

export function parseCfgFile() {
	dotenv.config({
		path: "../.env",
	});
}

export function isCookieSignKeyEmpty(): boolean {
	return process.env.COOKIE_SIGN_KEY == undefined;
}
