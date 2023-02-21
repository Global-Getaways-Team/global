import express, { Router } from "express";
import { get, create, list, put, del, all } from "../views/blog";

export const router: Router = express.Router();

router.get("/list/:limit", list);
router.get("/all", all);
router.get("/single/:id", get);
router.put("/update/:id", put);
router.post("/create", create);
router.delete("/delete/:id", del);
