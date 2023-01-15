import dataSource from "../../data-source";
import { AppError } from "../../errors/AppErrors";
import { Extras } from "../../entities/extras.entity";
import { IExtrasRequest } from "../../interfaces/extras";
import { ILike } from "typeorm";
import { Types } from "../../entities/type.entity";

export const updateExtrasService = async (
  extraId: string,
  extrasData: IExtrasRequest
) => {
  const repositoryData = dataSource.getRepository(Extras);
  const extraAlrealdyExists = await repositoryData.findOneBy({
    id: ILike(`%${extraId}%`),
  });

  const { typesId } = extrasData;
  const repositoryTypes = dataSource.getRepository(Types);
  const extraTypes = await repositoryTypes.findOneBy({ id: typesId });

  if (!extraAlrealdyExists) {
    throw new AppError("Extra doesn't exist!", 404);
  }

  const newExtra = repositoryData.create({ ...extrasData, types: extraTypes! });

  return await repositoryData.save(newExtra);
};