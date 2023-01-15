import dataSource from "../../data-source";
import { Extras } from "../../entities/extras.entity";
import { IExtras } from "../../interfaces/extras";

export const createExtraService = async (
	extra: IExtras
): Promise<Extras> => {
	const extrasRepository = dataSource.getRepository(Extras)
	const newExtra = extrasRepository.create(extra)
	await extrasRepository.save(newExtra)

	return newExtra
}

