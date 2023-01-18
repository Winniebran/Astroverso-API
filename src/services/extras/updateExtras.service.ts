import dataSource from "../../data-source";
import { AppError } from "../../errors/AppErrors";
import { Extras } from "../../entities/extras.entity";
import { IExtrasUpdate } from "../../interfaces/extras";
import { Types } from "../../entities/type.entity";

export const updateExtrasService = async (
  extraId: string,
  extrasData: IExtrasUpdate
) => {
  const repositoryData = dataSource.getRepository(Extras);
  const extraAlrealdyExists = await repositoryData.findOneBy({
    id: extraId,
  });

  if (!extraAlrealdyExists) {
    throw new AppError("Extra doesn't exist!", 404);
  }

  const typesRepository = dataSource.getRepository(Types);
  const typeAlrealdyExists = await typesRepository.findOneBy({
    id: extrasData.typesId,
  });

  const newExtra = repositoryData.create({
    ...extraAlrealdyExists,
    ...extrasData,
    types: typeAlrealdyExists ? typeAlrealdyExists : extraAlrealdyExists.types,
  });
  return await repositoryData.save(newExtra);
};
