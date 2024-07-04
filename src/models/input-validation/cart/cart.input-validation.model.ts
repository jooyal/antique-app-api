import { IsInt, IsOptional, IsUUID, Max, Min } from "class-validator";
import { Request } from "express";
import { ValidationGroup } from "../../enum/index.js";
import { PaginationInput } from "../pagination/pagination.input-validation-model.js";

class CartInput extends PaginationInput {
  @IsUUID(4)
  @IsOptional({ groups: [ValidationGroup.FILTER_ITEMS] })
  productId: string;

  @IsInt()
  @Min(1)
  @Max(5) //at a time, we can increase or decrease maximum 5 qty.
  @IsOptional() //this is nullable because it defaults to 1 qty if undefined.
  quantity?: number;

  constructor(req: Request) {
    super(req);
    this.productId = req.params?.productId;
    this.quantity = req.body?.quantity;
  }
}

export { CartInput };
