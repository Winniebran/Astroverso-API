import { ILike } from "typeorm";
import dataSourceConfig from "../../data-source";
import { AppError } from "../../errors/AppErrors";

import { Categories } from "../../entities/categories.entity";
import { ICategoriesRequest } from "../../interfaces/categories";

export const createCategoriesService = async (
	category: ICategoriesRequest
): Promise<Categories> => {
	const categoriesRepository = dataSourceConfig.getRepository(Categories);

	const categoryAlrealdyExists = await categoriesRepository.findOneBy({
		name: ILike(`%${category.name}%`)
	});

	if (categoryAlrealdyExists) {
		throw new AppError("Category already exists!", 409);
	}

	const newCategory = categoriesRepository.create(category);
	await categoriesRepository.save(newCategory);

	return newCategory;
};
