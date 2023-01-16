import dataSource from "../../data-source";
import { Extras } from "../../entities/extras.entity";

export const deleteExtrasService = async (extrasId: string) => {
  const repositoryData = dataSource.getRepository(Extras);
  await repositoryData.delete(extrasId);
  
};