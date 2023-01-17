import DataSource from "../../data-source";
import { Options } from "../../entities/options.entity";

export const getOptionsSrvice = async (): Promise<Options[]> => {
  try {
    const myTable = DataSource.getRepository(Options);

    const options = await myTable.find({
      relations: {
        questions: true,
      },
    });

    return options;
  } catch (error) {
    throw new AppError(error as string);
  }
};
