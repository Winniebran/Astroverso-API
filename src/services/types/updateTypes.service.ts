import dataSource from "../../data-source";
import { Types } from "../../entities/type.entity";
import { AppError } from "../../errors/AppErrors";
import { ITypes } from "../../interfaces/types";

export const updateTypesService = async (types: ITypes) => {
  const typesRepository = dataSource.getRepository(Types);
  const typeAlreadyExists = await typesRepository.findOneBy({
    id: types.id,
  });

  if (!typeAlreadyExists) {
    throw new AppError("Type doesn't exist!", 409);
  }

  return await typesRepository.save(types);
};
