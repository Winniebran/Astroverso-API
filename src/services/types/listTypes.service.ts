import dataSource from "../../data-source";
import { Types } from "../../entities/type.entity";

export const listTypesService = async (): Promise<Types[]> => {
  const typesRepository = dataSource.getRepository(Types);
  const types = await typesRepository.find();

  return types;
};
