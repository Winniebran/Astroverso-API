import dataSource from "../../data-source";
import { Options } from "../../entities/options.entity";
import { AppError } from "../../errors/AppErrors";
import { IUpdateOption } from "../../interfaces/options";

export const updateOptionsService = async (
  newData: IUpdateOption,
  optionId: string
): Promise<Options> => {
  try {
    const optionsRepository = dataSource.getRepository(Options);

    const findOption = await optionsRepository.findOneBy({
      id: optionId,
    });

    if (!findOption) {
      throw new AppError("Option not found!", 404);
    }

    const updateOption = optionsRepository.create({
      ...findOption,
      ...newData,
    });

    await optionsRepository.save({ ...updateOption });

    return updateOption;
  } catch (error) {
    throw new AppError(error as string);
  }
};
