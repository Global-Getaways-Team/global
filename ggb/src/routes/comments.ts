import express, { Router } from "express";
import { get, create, put, del, list } from "../views/comment";

export const router: Router = express.Router();

router.get("/list/:blogId", list);
router.get("/single/:id", get);

router.post("/create", create);

router.put("/update/:id", put);

router.delete("/delete/:id", del);
