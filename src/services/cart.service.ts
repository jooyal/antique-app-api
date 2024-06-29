import * as TypeORM from "typeorm";
import { AppDataSource } from "../db/datasource.js";
import { AppError } from "../models/app-error-handler.model.js";
import * as Entities from "../models/entity/index.js";
import { FilterEntityOutput, Maybe } from "../types/index.js";
import { logger } from "../utilities/index.js";
class CartService {
  private retrieveUserCart = async (userId: string): Promise<Entities.Cart> => {
    try {
      // let filterObj: TypeORM.FindOneOptions<Entities.Cart> = {
      //   where: { userId: userId },
      // };
      // if (returnCartItems) {
      //   filterObj = {
      //     ...filterObj,
      //     relations: {
      //       cartItems: true,
      //     },
      //     relationLoadStrategy: "query",
      //   };
      // }
      const fetchedUserCart = await AppDataSource.getRepository(Entities.Cart).findOne({
        where: { userId: userId },
      });
      if (!fetchedUserCart) {
        throw new AppError("Cart for the user not found!", 500);
      }
      return fetchedUserCart;
    } catch (error) {
      throw error;
    }
  };

  filterCartItems = async (
    userId: string,
    pageNumber: number = 1,
    take: number = 10
  ): Promise<FilterEntityOutput<Entities.CartItem>> => {
    try {
      const skip = (pageNumber - 1) * take;
      // check if cart exist for the user.
      const fetchedUserCart: Maybe<Entities.Cart> = await this.retrieveUserCart(userId);

      // fetch cart items
      const [fetchedCartItems, count] = await AppDataSource.getRepository(Entities.CartItem).findAndCount({
        where: { cartId: fetchedUserCart.id },
        skip: skip,
        take: take,
      });
      return {
        result: fetchedCartItems,
        totalCount: count,
      };
    } catch (error) {
      logger.error(error);
      throw new AppError(JSON.stringify(error), 500);
    }
  };

  addProductToCart = async (userId: string, productId: string, quantity: number): Promise<Entities.CartItem> => {
    try {
      // check if cart exist for the user.
      const fetchedUserCart: Maybe<Entities.Cart> = await this.retrieveUserCart(userId);

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
      logger.error(error);
      throw new AppError(JSON.stringify(error), 500);
    }
  };

  clearCart = async (userId: string): Promise<boolean> => {
    try {
      // check if cart exist for the user.
      const fetchedUserCart: Maybe<Entities.Cart> = await this.retrieveUserCart(userId);

      // remove all entries for the cart in cart-item table
      const result: TypeORM.DeleteResult = await AppDataSource.getRepository(Entities.CartItem).delete({
        cartId: fetchedUserCart.id,
      });
      if (result.affected) {
        return true;
      }
      // TODO: check the behaviour before merging below line
      throw new AppError("Failed to clear cart", 500);
    } catch (error) {
      logger.error(error);
      throw new AppError(JSON.stringify(error), 500);
    }
  };
}

const cartService = new CartService();
export { cartService };
