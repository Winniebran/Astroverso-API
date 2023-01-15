import dataSource from "../../data-source";
import { AppError } from "../../errors/AppErrors";
import { Extras } from "../../entities/extras.entity";
import { IExtrasRequest } from "../../interfaces/extras";

export const updateExtrasService = async (
  extraId: string,
  extrasData: IExtrasRequest
) => {
  const repositoryData = dataSource.getRepository(Extras);

  const extraAlrealdyExists = await repositoryData.findOneBy({
    id: extraId,
  });

  if (!extraAlrealdyExists) {
    throw new AppError("Extra doesn't exist!", 404);
  }

  const newExtra = repositoryData.create({
    ...extraAlrealdyExists,
    ...extrasData,
  });

  return await repositoryData.save(newExtra);
};
