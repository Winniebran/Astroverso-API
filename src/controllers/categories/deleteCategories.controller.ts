import { Request, Response } from "express";
import { deleteCategoriesService } from "../../services/categories/deleteCategories.service";

export const deleteCategoriesController = async (
	req: Request,
	res: Response
) => {
	const categoryId = req.params.id;
	await deleteCategoriesService(categoryId);
	return res.status(204).json();
};
