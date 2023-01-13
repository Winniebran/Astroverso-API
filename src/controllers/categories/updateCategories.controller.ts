import { Request, Response } from "express";
import { ICategoriesResponse } from "../../interfaces/categories";
import { updateCategoriesService } from "../../services/categories/updateCategories.service";

export const updateCategoriesController = async (
	req: Request,
	res: Response
) => {
	const categoryData: ICategoriesResponse = req.body;
	const updatedCategory = await updateCategoriesService(categoryData);

	return res.status(200).json(updatedCategory);
};
