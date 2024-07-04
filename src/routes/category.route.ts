import express from "express";
import { categoryController } from "../controller/index.js";

const router: express.Router = express.Router();

// get all categories
router.route("/").get(categoryController.filterCategoryItems);

export { router as categoryRoute };
