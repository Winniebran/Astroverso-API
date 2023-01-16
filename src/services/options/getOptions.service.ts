import { AppError } from "../../errors/AppErrors";
import DataSource from "../../data-source";
import { Options } from "../../entities/options.entity";

export const getOptionsSrvice = async (): Promise<Options[]> => {
	try {
		const myTable = DataSource.getRepository(Options);

		const options = await myTable.find();

		return options;
	} catch (error) {
		throw new AppError(error as string);
	}
};
