import { AppDataSource } from "../db/datasource.js";
import { AppError } from "../models/app-error-handler.model.js";
import * as Entities from "../models/entity/index.js";
import { FilterEntityOutput } from "../types/index.js";
import { logger } from "../utilities/index.js";
class CatrgoryService {
  filterCategories = async (
    pageNumber: number = 1,
    take: number = 10
  ): Promise<FilterEntityOutput<Entities.Category>> => {
    try {
      const skip = (pageNumber - 1) * take;
      const [fetchedCategories, count] = await AppDataSource.getRepository(Entities.Category).findAndCount({
        skip: skip,
        take: take,
      });
      return {
        result: fetchedCategories,
        totalCount: count,
      };
    } catch (error) {
      logger.error(error);
      throw new AppError(JSON.stringify(error), 500);
    }
  };
}

const categoryService = new CatrgoryService();
export { categoryService };
