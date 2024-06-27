import express from "express";

import { authRoute } from "./auth.route.js";
import { cartRoute } from "./cart.route.js";
import { categoryRoute } from "./category.route.js";
import { discountRoute } from "./discount.route.js";
import { orderRoute } from "./order.route.js";
import { productRoute } from "./product.route.js";
import { userRoute } from "./user.route.js";
import { wishlistRoute } from "./wishlist.route.js";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/cart", cartRoute);
router.use("/category", categoryRoute);
router.use("/discount", discountRoute);
router.use("/order", orderRoute);
router.use("/product", productRoute);
router.use("/user", userRoute);
router.use("/wishlist", wishlistRoute);

export { router as baseAPIRouter };
