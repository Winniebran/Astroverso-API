import dataSource from "../../data-source";
import { Extras } from "../../entities/extras.entity";
import { AppError } from "../../errors/AppErrors";

const deleteExtrasService = async (extrasId: string) => {
  const repositoryData = dataSource.getRepository(Extras);
  await repositoryData.delete(extrasId);
  
};

export default deleteExtrasService;
