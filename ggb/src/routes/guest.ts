import express, { Router } from "express";
import { get, create, list } from "../views/guest";

export const router: Router = express.Router();

router.get("/:id", get);
router.get("/list/:limit", list);

router.post("/create", create);
