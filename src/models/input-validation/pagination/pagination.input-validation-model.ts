import { IsInt, IsOptional, Min } from "class-validator";
import { Request } from "express";
import { ValidationGroup } from "../../enum/validation-group.enum.js";

export abstract class PaginationInput {
  @IsInt({ groups: [ValidationGroup.FILTER_ITEMS] })
  @Min(1, { groups: [ValidationGroup.FILTER_ITEMS] })
  @IsOptional()
  pageNumber?: number;

  @IsInt({ groups: [ValidationGroup.FILTER_ITEMS] })
  @Min(0, { groups: [ValidationGroup.FILTER_ITEMS] })
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
