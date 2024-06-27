import { BaseEntity } from "./base.entity.js";
import { CartItem } from "./cart-item.entity.js";
import { Cart } from "./cart.entity.js";
import { Category } from "./category.entity.js";
import { Discount } from "./discount.entity.js";
import { OrderItem } from "./order-item.entity.js";
import { Order } from "./order.entity.js";
import { Product } from "./product.entity.js";
import { UserFeedback } from "./user-feedback.entity.js";
import { User } from "./user.entity.js";
import { WishlistItem } from "./wishlist-item.entity.js";
import { Wishlist } from "./wishlist.entity.js";

export const entities = [
  Cart,
  CartItem,
  Category,
  Discount,
  Order,
  OrderItem,
  Product,
  User,
  UserFeedback,
  Wishlist,
  WishlistItem,
];

export {
  BaseEntity,
  Cart,
  CartItem,
  Category,
  Discount,
  Order,
  OrderItem,
  Product,
  User,
  UserFeedback,
  Wishlist,
  WishlistItem
};

