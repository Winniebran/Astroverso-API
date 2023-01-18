import dataSourceConfig from "../../data-source";
import { Categories } from "../../entities/categories.entity";
import { ICategoriesResponse } from "../../interfaces/categories";
import { listCategoriesSchema } from "../../schemas/categories.schema";

export const listCategoriesService = async (): Promise<
  ICategoriesResponse[] | undefined
> => {
  const categoriesRepository = dataSourceConfig.getRepository(Categories);
  const listCategories = await categoriesRepository.find();

  const validatedData = await listCategoriesSchema.validate(listCategories, {
    stripUnknown: true,
  });

  return validatedData;
};
