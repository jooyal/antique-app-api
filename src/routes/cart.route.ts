import express from "express";
import { protect } from "../middlewares/index.js";

const router: express.Router = express.Router();

// protect all routes below from public access
router.use(protect);

export { router as cartRoute };
