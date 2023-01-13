import DataSource from "../../data-source";
import { Options } from "../../entities/options.entity";
import { AppError } from "../../errors/AppErrors";
import { IOptions } from "../../interfaces/options";

export const updateOptionsService = async (
  newData: IOptions,
  optionId: string
): Promise<Options> => {
  try {
    const myTable = DataSource.getRepository(Options);
    const option = await myTable.findOneBy({
      id: optionId,
    });

    const update = myTable.create({
      ...option,
      ...newData,
    });

    const save = await myTable.save(update);

    return save;
  } catch (error) {
    throw new AppError(error as string);
  }
};
