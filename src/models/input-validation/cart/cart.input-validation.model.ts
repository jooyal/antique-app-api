import { IsInt, IsOptional, IsUUID, Min } from "class-validator";
import { Request } from "express";
import { ValidationGroup } from "../../enum/index.js";

class CartInput {
  @IsUUID(4)
  productId: string;

  @IsInt()
  @Min(1)
  @IsOptional({ groups: [ValidationGroup.DELETE_ITEM_FROM_CART] })
  quantity: number;

  @IsInt({ groups: [ValidationGroup.FILTER_CART_ITEMS] })
  @Min(1, { groups: [ValidationGroup.FILTER_CART_ITEMS] })
  @IsOptional()
  pageNumber?: number;

  @IsInt({ groups: [ValidationGroup.FILTER_CART_ITEMS] })
  @Min(0, { groups: [ValidationGroup.FILTER_CART_ITEMS] })
  @IsOptional()
  take?: number;

  constructor(req: Request) {
    this.productId = req.body?.productId;
    this.quantity = req.body?.quantity;

    // for pagination
    function getNumericQueryParam(req: Request, param: "pageNumber" | "take") {
      const value = Number(req.query?.[param]);
      return isNaN(value) ? undefined : value;
    }
    this.pageNumber = getNumericQueryParam(req, "pageNumber");
    this.take = getNumericQueryParam(req, "take");
  }
}

export { CartInput };
