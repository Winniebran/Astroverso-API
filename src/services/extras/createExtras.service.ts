import dataSource from "../../data-source";
import { Extras } from "../../entities/extras.entity";
import { IExtras } from "../../interfaces/extras";
import { ILike } from "typeorm";
import { AppError } from "../../errors/AppErrors";

export const createExtraService = async (
	extra: IExtras
): Promise<Extras> => {
	const extrasRepository = dataSource.getRepository(Extras)
	const extraAlrealdyExists = await extrasRepository.findOneBy({
		title: ILike(`%${extra.title}%`),
		image: ILike(`%${extra.image}%`)
	})

	if (extraAlrealdyExists) {
		throw new AppError("Extra already exists!", 409)
	}

	const newExtra = extrasRepository.create(extra)
	await extrasRepository.save(newExtra)

	return newExtra
};