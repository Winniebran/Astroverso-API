import DataSource from "../../data-source";
import { Options } from "../../entities/options.entity";
import { AppError } from "../../errors/AppErrors";
import { IOptions } from "../../interfaces/options";

export const createOptionsService = async (
  optionData: IOptions
): Promise<[number, object]> => {
  try {
    
    const myTable = DataSource.getRepository(Options);

    const saveData = await myTable.save(optionData);

    return [201, saveData];
  } catch (error) {
    throw new AppError(error as string);
  }
};
