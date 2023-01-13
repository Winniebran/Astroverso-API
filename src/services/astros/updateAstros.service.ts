import dataSourceConfig from "../../data-source";
import { Astros } from "../../entities/astros.entity";
import { IAstrosResponse } from "../../interfaces/astros";

export const updateAstrosService = async (updatedAstro: IAstrosResponse) => {
	const astrosRepository = dataSourceConfig.getRepository(Astros);

	return await astrosRepository.save(updatedAstro);
};
