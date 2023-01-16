import dataSource from "../../data-source";
import { Extras } from "../../entities/extras.entity";

export const listExtrasService = async (): Promise<Extras[]> => {
  const repository = dataSource.getRepository(Extras);
  const extras = await repository.find();

  return extras;
};
