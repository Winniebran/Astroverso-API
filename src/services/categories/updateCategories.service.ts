import dataSourceConfig from "../../data-source";
import { AppError } from "../../errors/AppErrors";
import { Categories } from "../../entities/categories.entity";
import { ICategoriesResponse } from "../../interfaces/categories";

export const updateCategoriesService = async (
	updatedCategory: ICategoriesResponse
): Promise<Categories> => {
	const categoriesRepository = dataSourceConfig.getRepository(Categories);

	return await categoriesRepository.save(updatedCategory);
};
