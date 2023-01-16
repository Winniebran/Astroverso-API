import dataSourceConfig from "../../data-source";
import { Categories } from "../../entities/categories.entity";

export const deleteCategoriesService = async (categoryId: string) => {
	console.log(categoryId);
	const categoriesRepository = dataSourceConfig.getRepository(Categories);

	await categoriesRepository.delete(categoryId);
};
