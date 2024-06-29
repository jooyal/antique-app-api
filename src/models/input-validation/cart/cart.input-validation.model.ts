import { IsInt, IsString } from "class-validator";
import { Request } from "express";

class CartInput {
  @IsString()
  productId: string;

  @IsInt()
  quantity: number;

  constructor(req: Request) {
    this.productId = req.body?.productId;
    this.quantity = req.body?.quantity;
  }
}

export { CartInput };
