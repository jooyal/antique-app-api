import express from "express";
import { protect } from "../middlewares/index.js";
import { cartController } from "../controller/index.js";

const router: express.Router = express.Router();

// protect all routes below from public access
router.use(protect);

// get: fetch items in cart for the user
// post: add item to cart
// delete: clear cart
router
  .route("/")
  .get(cartController.filterCartItems)
  .post(cartController.addProductToCart)
  .delete(cartController.clearCart);

// add or remove quantity
router.route("/update-quantity").patch();

// delete a product from cart irrespective of quantity
router.route("/:productId").delete();

export { router as cartRoute };
