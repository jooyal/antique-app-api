import { NextFunction, Request, Response } from "express";
import * as Entities from "../models/entity/index.js";
import { ValidationGroup } from "../models/enum/index.js";
import { CartInput } from "../models/input-validation/index.js";
import { cartService } from "../services/index.js";
import { FilterEntityOutput } from "../types/common.types.js";
import { logger, validateRequest } from "../utilities/index.js";

class CartController {
  filterCartItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const request: CartInput = new CartInput(req);
      // payload validation
      await validateRequest(request, [ValidationGroup.FILTER_CART_ITEMS]);
      const cartItems: FilterEntityOutput<Entities.CartItem> = await cartService.filterCartItems(
        req.context.user.id,
        request.pageNumber,
        request.take
      );
      res.status(200).json(cartItems);
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };

  addProductToCart = async (req: Request, res: Response, next: NextFunction) => {
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

  clearCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await cartService.clearCart(req.context.user.id);
      res.status(200).json({ message: "Cart cleared successfully!" });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };
}

const cartController = new CartController();
export { cartController };
