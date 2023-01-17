import DataSource from "../../data-source";
import { Options } from "../../entities/options.entity";
import { AppError } from "../../errors/AppErrors";

export const deleteOptionService = async (optionId: string): Promise<void> => {
  const optionsRepository = DataSource.getRepository(Options);

  const findOption = await optionsRepository.findOneBy({
    id: optionId,
  });

  if (!findOption) {
    throw new AppError("Option not found!", 404);
  }

  await optionsRepository.delete(optionId);
};
