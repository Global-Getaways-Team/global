import express, { Router } from "express";
import { get, create, list, del } from "../views/favorite";

export const router: Router = express.Router();

// getter
router.get("/single/:blogId", get);
router.get("/all", list);

// post
router.post("/create", create);

// delete
router.delete("/delete/:id", del);
