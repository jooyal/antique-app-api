import { NextFunction, Request, Response } from "express";
import { CartInput } from "../models/input-validation/index.js";
import { cartService } from "../services/index.js";
import { validateRequest, logger } from "../utilities/index.js";

class CartController {
  addItemToCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const request: CartInput = new CartInput(req);
      // payload validation
      await validateRequest(request);
      await cartService.addProductToCart(req.context.user.id, request.productId, request.quantity);
      res.status(200).json({ message: "Item added to cart successfully" });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };
}

const cartController = new CartController();
export { cartController };
