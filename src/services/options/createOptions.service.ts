import DataSource from "../../data-source";
import { Options } from "../../entities/options.entity";
import { Questions } from "../../entities/questions.entity";
import { AppError } from "../../errors/AppErrors";
import { IOptions, IOptionsResponse } from "../../interfaces/options";

export const createOptionsService = async (
  optionData: IOptions
): Promise<IOptionsResponse> => {
  const optionsRepository = DataSource.getRepository(Options);
  const questionsRepository = DataSource.getRepository(Questions);

  const optionsExists = await optionsRepository.findOneBy({
    answer: optionData.answer,
  });

  if (optionsExists) {
    throw new AppError("Option already exists!", 409);
  }

  const questionsExists = await questionsRepository.findOneBy({
    id: optionData.questionsId,
  });

  if (!questionsExists) {
    throw new AppError("Question not found", 404);
  }

  const newOption = optionsRepository.create({
    answer: optionData.answer,
    point: optionData.point,
    isCorrect: optionData.isCorrect,
    questions: questionsExists,
  });
  await optionsRepository.save(newOption);

  return newOption;
};
