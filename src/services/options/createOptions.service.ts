import DataSource from "../../data-source";
import { Options } from "../../entities/options.entity";
import { Questions } from "../../entities/questions.entity";
import { AppError } from "../../errors/AppErrors";
import { IOptions, IOptionsResponse } from "../../interfaces/options";

export const createOptionsService = async (
  optionData: IOptions
): Promise<Options> => {
  const myTable = DataSource.getRepository(Questions);

  const findOptions = await myTable.find({
    where: {
      id: optionData.questionsId,
      options: {
        answer: optionData.answer,
      },
    },
    relations: {
      options: true,
    },
  });

  if (findOptions.length) {
    throw new AppError("Option already exists", 409);
  }

  const { questionsId } = optionData;

  const otherTable = DataSource.getRepository(Questions);
  const myOtherTable = DataSource.getRepository(Options);

  const find = await otherTable.findOneBy({
    id: questionsId,
  });

  const createData = myOtherTable.create({ ...optionData, questions: find! });

  const saveData = await myOtherTable.save(createData);

  return saveData;
};
