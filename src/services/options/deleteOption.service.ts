import { DeleteResult } from "typeorm";
import DataSource from "../../data-source";
import { Options } from "../../entities/options.entity";
import { AppError } from "../../errors/AppErrors";

export const deleteOptionService = async (
	optionId: string
): Promise<DeleteResult> => {
	try {
		const myTable = DataSource.getRepository(Options);

		const deletId = await myTable.delete({
			id: optionId
		});

		return deletId;
	} catch (error) {
		throw new AppError(error as string);
	}
};
