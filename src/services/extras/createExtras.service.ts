import { ILike } from "typeorm";
import dataSource from "../../data-source";
import { Extras } from "../../entities/extras.entity";
import { Types } from "../../entities/type.entity";
import { AppError } from "../../errors/AppErrors";
import { IExtrasRequest } from "../../interfaces/extras";

export const createExtraService = async (
  extrasData: IExtrasRequest
): Promise<Extras> => {
  const extrasRepository = dataSource.getRepository(Extras);
  const extraAlrealdyExists = await extrasRepository.findOne({ 
	relations: {
		types: true,
	  },
	where: {
      title: extrasData.title,
      image: extrasData.image,
      author: extrasData.author,
      description: extrasData.description,
      link: extrasData.link,
      types: { id: extrasData.typesId },
    }
  });

  const { typesId } = extrasData;
  const repositoryTypes = dataSource.getRepository(Types);
  const extraTypes = await repositoryTypes.findOneBy({ id: typesId });

  if (extraAlrealdyExists) {
    throw new AppError("Extra already exists!", 409);
  }

  const newExtra = extrasRepository.create({
    ...extrasData,
    types: extraTypes!,
  });
  return await extrasRepository.save(newExtra);
};
