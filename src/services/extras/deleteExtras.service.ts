import dataSource from "../../data-source";
import { Extras } from "../../entities/extras.entity";
import { AppError } from "../../errors/AppErrors";

export const deleteExtrasService = async (extrasId: string) => {
  const repositoryData = dataSource.getRepository(Extras);
  if(!extrasId || extrasId === null) {
    throw new AppError("Id not found")
  }
  await repositoryData.delete(extrasId);
  
};