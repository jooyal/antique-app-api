import { AppDataSource } from "../db/datasource.js";
import { AppError } from "../models/app-error-handler.model.js";
import * as Entities from "../models/entity/index.js";
import { Maybe } from "../types/index.js";
class CartService {
  addProductToCart = async (userId: string, productId: string, quantity: number): Promise<Entities.CartItem> => {
    try {
      // check if cart exist for the user.
      const fetchedUserCart: Maybe<Entities.Cart> = await AppDataSource.getRepository(Entities.Cart).findOne({
        where: { userId: userId },
      });
      if (!fetchedUserCart) {
        throw new AppError("Cart for the user not found!", 500);
      }

      // checks for product
      const fetchedProduct: Maybe<Entities.Product> = await AppDataSource.getRepository(Entities.Product).findOne({
        where: { id: productId },
      });
      // if product with the id does not exist
      if (!fetchedProduct) {
        throw new AppError("Product with the id not found!", 404);
      }
      // if product is disabled
      if (!fetchedProduct.isActive) {
        throw new AppError("Product currently unavailable, please try again later.", 200);
      }
      // if quantity is 0
      if (fetchedProduct.inStockQuantity === 0) {
        throw new AppError("Product is out of stock, please try again later.", 200);
      }
      // check if the quantity to add is less than the available product quantity
      if (quantity > fetchedProduct.inStockQuantity) {
        throw new AppError("Product quantity exceeds the available quantity!", 404);
      }

      let cartItem: Entities.CartItem = new Entities.CartItem();
      cartItem.cartId = fetchedUserCart.id;
      cartItem.productId = fetchedProduct.id;
      cartItem.quantity = quantity;

      cartItem = await AppDataSource.getRepository(Entities.CartItem).save(cartItem);

      if (cartItem) {
        return cartItem;
      }
      throw new AppError("Failed to add product to cart", 500);
    } catch (error) {
      throw new AppError(JSON.stringify(error), 500);
    }
  };
}

const cartService = new CartService();
export { cartService, CartService };
