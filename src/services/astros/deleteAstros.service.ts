import dataSourceConfig from "../../data-source";
import { Astros } from "../../entities/astros.entity";

export const deleteAstrosService = async (astroId: string) => {
	const astrosRepository = dataSourceConfig.getRepository(Astros);

	await astrosRepository.delete(astroId);
};
