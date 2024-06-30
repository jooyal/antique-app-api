import { IsInt, IsOptional, IsUUID, Max, Min } from "class-validator";
import { Request } from "express";
import { ValidationGroup } from "../../enum/index.js";

class PaginationInput {
  @IsInt({ groups: [ValidationGroup.FILTER_CART_ITEMS] })
  @Min(1, { groups: [ValidationGroup.FILTER_CART_ITEMS] })
  @IsOptional()
  pageNumber?: number;

  @IsInt({ groups: [ValidationGroup.FILTER_CART_ITEMS] })
  @Min(0, { groups: [ValidationGroup.FILTER_CART_ITEMS] })
  @IsOptional()
  take?: number;

  constructor(req: Request) {
    function getNumericQueryParam(req: Request, param: "pageNumber" | "take") {
      const value = Number(req.query?.[param]);
      return isNaN(value) ? undefined : value;
    }
    this.pageNumber = getNumericQueryParam(req, "pageNumber");
    this.take = getNumericQueryParam(req, "take");
  }
}

class CartInput extends PaginationInput {
  @IsUUID(4)
  @IsOptional({ groups: [ValidationGroup.FILTER_CART_ITEMS] })
  productId: string;

  @IsInt()
  @Min(1)
  @Max(5) //at a time, we can increase or decrease maximum 5 qty.
  @IsOptional()
  quantity?: number;

  constructor(req: Request) {
    super(req);
    this.productId = req.params?.productId;
    this.quantity = req.body?.quantity;
  }
}

export { CartInput };
