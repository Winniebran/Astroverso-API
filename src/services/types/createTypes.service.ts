import dataSource from "../../data-source";
import { Types } from "../../entities/type.entity";
import { AppError } from "../../errors/AppErrors";
import { ITypes } from "../../interfaces/types";

export const createTypesService = async (types: ITypes): Promise<Types> => {
  const typesRepository = dataSource.getRepository(Types);
  const typeAlreadyExists = await typesRepository.findOneBy({
    id: types.id,
  });

  if (typeAlreadyExists) {
    throw new AppError("type already exists!", 409);
  }

  const newType = typesRepository.create(types);
  await typesRepository.save(newType);

  return newType;
};
