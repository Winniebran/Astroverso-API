import { Request, Response } from "express";
import { ICategoriesRequest } from "../../interfaces/categories";
import { createCategoriesService } from "../../services/categories/createCategories.service";

export const createCategoriesController = async (
	req: Request,
	res: Response
) => {
	const category: ICategoriesRequest = req.body;
	const newCategory = await createCategoriesService(category);

	return res.status(201).json(newCategory);
};
