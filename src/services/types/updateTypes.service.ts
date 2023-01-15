import dataSource from "../../data-source";
import { Types } from "../../entities/type.entity";
import { AppError } from "../../errors/AppErrors";
import { ITypes } from "../../interfaces/types";

export const updateTypesService = async (types: ITypes, updateId: string) => {
  const typesRepository = dataSource.getRepository(Types);
  const typeAlreadyExists = await typesRepository.findOneBy({
    id: updateId,
  });

  if (!typeAlreadyExists) {
    throw new AppError("Type doesn't exist!", 409);
  }

  const updatedType = typesRepository.create({
    ...typeAlreadyExists,
    name: types.name,
  });
  await typesRepository.save(updatedType);

  return updatedType;
};
