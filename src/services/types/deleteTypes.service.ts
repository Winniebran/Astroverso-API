import dataSource from "../../data-source";
import { Types } from "../../entities/type.entity";

const deleteTypesService = async (id: string) => {
  const repositoryData = dataSource.getRepository(Types);
  await repositoryData.delete(id);
};

export default deleteTypesService;
