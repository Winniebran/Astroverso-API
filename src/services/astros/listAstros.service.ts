import dataSourceConfig from "../../data-source";
import { Astros } from "../../entities/astros.entity";

export const listAstrosService = async (): Promise<Astros[]> => {
	const astrosRepository = dataSourceConfig.getRepository(Astros);
	const listAstros = await astrosRepository.find();

	return listAstros;
};
