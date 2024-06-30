import express from "express";
import { protect } from "../middlewares/index.js";
import { cartController } from "../controller/index.js";

const router: express.Router = express.Router();

// protect all routes below from public access
router.use(protect);

// get: fetch items in cart for the user
// delete: clear cart
router
  .route("/")
  .get(cartController.filterCartItems)
  .delete(cartController.clearCart);

// add or remove item to cart, default quantity = 1
router.route("/:productId/increment").patch(cartController.increaseProductQuantity);
router.route("/:productId/decrement").patch(cartController.decreaseProductQuantity);

// delete a product from cart irrespective of quantity
router.route("/:productId").delete(cartController.removeProductFromCart);

export { router as cartRoute };
