import * as TypeORM from "typeorm";
import { AppDataSource } from "../db/datasource.js";
import { AppError } from "../models/app-error-handler.model.js";
import * as Entities from "../models/entity/index.js";
import { FilterEntityOutput, Maybe } from "../types/index.js";
import { logger } from "../utilities/index.js";
import _ from "lodash";
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

  increaseOrDecreaseProductQty = async (
    userId: string,
    productId: string,
    action: "increase" | "decrease",
    quantity: number = 1
  ): Promise<Entities.CartItem> => {
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

      // fetched product in cart if already available
      let cartItem: Maybe<Entities.CartItem> = await AppDataSource.getRepository(Entities.CartItem).findOne({
        where: { cartId: fetchedUserCart.id, productId: fetchedProduct.id },
      });

      if (action === "increase") {
        // if product does not exist in cart-item table
        if (_.isEmpty(cartItem)) {
          // check if the quantity to add is less than the available product quantity
          if (quantity > fetchedProduct.inStockQuantity) {
            throw new AppError("Product quantity exceeds the available quantity!", 404);
          }

          // save product to cart-item table.
          cartItem = new Entities.CartItem();
          cartItem.cartId = fetchedUserCart.id;
          cartItem.productId = fetchedProduct.id;
          cartItem.quantity = quantity;
          cartItem = await AppDataSource.getRepository(Entities.CartItem).save(cartItem);
          return cartItem;
        } else {
          // check if the quantity to add + existing quantity is less than the available product quantity
          if (quantity + cartItem.quantity > fetchedProduct.inStockQuantity) {
            throw new AppError("Product quantity exceeds the available quantity!", 404);
          }

          // update the quantity
          cartItem = await AppDataSource.getRepository(Entities.CartItem).save({
            ...cartItem,
            quantity: cartItem.quantity + quantity,
          });
          return cartItem;
        }
      } else {
        if (_.isEmpty(cartItem)) {
          throw new AppError("Failed to decrease the product quantity since the product does not exist in cart!", 404);
        }

        // check if the quantity to reduce is more than existing quantity in cart
        if (quantity > cartItem.quantity) {
          throw new AppError("Quantity to decrease exceeds the available quantity in cart!", 404);
        }

        // check if quantity to decrease is equal to existing quantity. if yes, remove the product entry in cart-item for the cart.
        if (quantity === cartItem.quantity) {
          cartItem = await AppDataSource.getRepository(Entities.CartItem).remove(cartItem);
          return cartItem;
        }

        cartItem = await AppDataSource.getRepository(Entities.CartItem).save({
          ...cartItem,
          quantity: cartItem.quantity - quantity,
        });
        return cartItem;
      }
    } catch (error) {
      logger.error(error);
      throw new AppError(JSON.stringify(error), 500);
    }
  };

  removeProductFromCart = async (userId: string, productId: string): Promise<void> => {
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

      // fetched product in cart
      let cartItem: Maybe<Entities.CartItem> = await AppDataSource.getRepository(Entities.CartItem).findOne({
        where: { cartId: fetchedUserCart.id, productId: fetchedProduct.id },
      });

      // if product does not exist in cart
      if (_.isEmpty(cartItem)) {
        throw new AppError("Product does not exist in cart!", 404);
      }
      await AppDataSource.getRepository(Entities.CartItem).remove(cartItem);
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
