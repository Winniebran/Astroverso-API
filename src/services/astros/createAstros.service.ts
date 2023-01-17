import { ILike } from "typeorm";
import dataSourceConfig from "../../data-source";
import { Astros } from "../../entities/astros.entity";
import { AppError } from "../../errors/AppErrors";

import { IAstrosRequest } from "../../interfaces/astros";

export const createAstrosService = async (
	astro: IAstrosRequest
): Promise<Astros> => {
	const astrosRepository = dataSourceConfig.getRepository(Astros);

	const astroAlrealdyExists = await astrosRepository.findOneBy({
		name: ILike(`%${astro.name}%`)
	});

	if (astroAlrealdyExists) {
		throw new AppError("Astro already exists!", 409);
	}

	const newAstro = astrosRepository.create(astro);
	await astrosRepository.save(newAstro);

	return newAstro;
};
