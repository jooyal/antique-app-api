import { ValidationError, validate } from "class-validator";
import { AppError } from "../models/app-error-handler.model.js";
import { ValidationGroup } from "../models/enum/index.js";
import { Dict } from "../types/index.js";

class ValidateRequest {
  validator = async <T extends object>(classToValidate: T, validationGroups?: ValidationGroup[]): Promise<void> => {
    const validationErrors: ValidationError[] = await validate(
      classToValidate,
      validationGroups ? { groups: validationGroups } : {}
    );
    if (validationErrors.length > 0) {
      const errors: Dict<string>[] = [];
      let count = 0;
      validationErrors.forEach((error) => {
        if (error.constraints) {
          count++;
          errors.push({ [`${count}`]: `${Object.values(error.constraints).join(", ")}` });
        }
      });
      throw new AppError(JSON.stringify(errors), 400);
    }
    return;
  };
}

const validateRequest = new ValidateRequest().validator;

export { validateRequest };
