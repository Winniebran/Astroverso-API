import DataSource from "../../data-source";
import { Options } from "../../entities/options.entity";
import { Questions } from "../../entities/questions.entity";
import { AppError } from "../../errors/AppErrors";
import { IOptions } from "../../interfaces/options";

export const createOptionsService = async (
  optionData: IOptions
): Promise<[number, object]> => {
  try {
    const { questionsId } = optionData;

    const otherTable = DataSource.getRepository(Questions);
    const myTable = DataSource.getRepository(Options);

    const find = await otherTable.findOneBy({
      id: questionsId,
    });

    const createData = myTable.create({ ...optionData, questions: find! });

    const saveData = await myTable.save(createData);

    return [201, saveData];
  } catch (error) {
    throw new AppError(error as string);
  }
};
