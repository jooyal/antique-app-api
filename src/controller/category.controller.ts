import { NextFunction, Request, Response } from "express";
import * as Entities from "../models/entity/index.js";
import { ValidationGroup } from "../models/enum/index.js";
import { CategoryInput } from "../models/input-validation/index.js";
import { categoryService } from "../services/index.js";
import { FilterEntityOutput } from "../types/common.types.js";
import { logger, validateRequest } from "../utilities/index.js";

class CategoryController {
  filterCategoryItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const request: CategoryInput = new CategoryInput(req);
      // payload validation
      await validateRequest(request, [ValidationGroup.FILTER_ITEMS]);
      const categoryItems: FilterEntityOutput<Entities.Category> = await categoryService.filterCategories(
        request.pageNumber,
        request.take
      );
      res.status(200).json(categoryItems);
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };
}

const categoryController = new CategoryController();
export { categoryController };
