import DataSource from "../../data-source";
import { Options } from "../../entities/options.entity";
import { AppError } from "../../errors/AppErrors";

export const deleteOptionService = async (optionId: string): Promise<void> => {
  try {
    const optionsRepository = DataSource.getRepository(Options);

    await optionsRepository.delete(optionId);
  } catch (error) {
    throw new AppError(error as string);
  }
};
