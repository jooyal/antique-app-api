import { Request } from "express";
import { PaginationInput } from "../pagination/pagination.input-validation-model.js";

class CategoryInput extends PaginationInput {
  constructor(req: Request) {
    super(req);
  }
}

export { CategoryInput };
