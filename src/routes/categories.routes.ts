import { Router } from "express";
import { isAdmMiddleware } from "../middlewares/isAdm.middleware";
import { categoriesRequestSchema } from "../schemas/categories.schema";
import { AuthMiddleware } from "../middlewares/authentication.middleware";
import { dataIsValidMiddleware } from "../middlewares/dataIsValid.middleware";
import { listCategoriesController } from "../controllers/categories/listCategories.controller";
import { updateCategoriesController } from "../controllers/categories/updateCategories.controller";
import { createCategoriesController } from "../controllers/categories/createCategories.controller";
import { deleteCategoriesController } from "../controllers/categories/deleteCategories.controller";
import { updateCategoriesExistsMiddleware } from "../middlewares/categories/updateCategoriesExists.middleware";
import { ensureCategoriesExistsMiddleware } from "../middlewares/categories/ensureCategoriesExists.middleware";
import { idIsValidMiddleware } from "../middlewares/IdIsValid.middleware";

export const categoriesRoutes = Router();

categoriesRoutes.post(
	"",
	AuthMiddleware,
	isAdmMiddleware,
	dataIsValidMiddleware(categoriesRequestSchema),
	createCategoriesController
);
categoriesRoutes.get("", listCategoriesController);
categoriesRoutes.patch(
	"/:id",
	AuthMiddleware,
	isAdmMiddleware,
	dataIsValidMiddleware(categoriesRequestSchema),
	idIsValidMiddleware,
	updateCategoriesExistsMiddleware,
	updateCategoriesController
);
categoriesRoutes.delete(
	"/:id",
	AuthMiddleware,
	isAdmMiddleware,
	idIsValidMiddleware,
	ensureCategoriesExistsMiddleware,
	deleteCategoriesController
);
