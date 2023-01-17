import DataSource from "../../data-source";
import { Options } from "../../entities/options.entity";

export const getOptionsService = async (): Promise<Options[]> => {
  const optionsRepository = DataSource.getRepository(Options);

  const options = await optionsRepository.find();

  return options;
};
