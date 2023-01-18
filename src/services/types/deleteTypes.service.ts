import dataSource from "../../data-source";
import { Types } from "../../entities/type.entity";
import { AppError } from "../../errors/AppErrors";

const deleteTypesService = async (id: string) => {
  const repositoryData = dataSource.getRepository(Types);
  const verifyType = await repositoryData.findOneBy({ id: id });
  if (verifyType === null || "") {
    throw new AppError("Type not found", 404);
  }
  return await repositoryData.delete(id);
};

export default deleteTypesService;
