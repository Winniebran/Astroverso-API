import dataSourceConfig from "../../data-source";
import { AppError } from "../../errors/AppErrors";

import { Questions } from "../../entities/questions.entity";
import { IQuestionsResponse, IQuestionsEdit } from "../../interfaces/questions";
import { QuestionsWithoutOptions } from "../../schemas/questions.schema";


const editQuestionsService = async (id: string, data: IQuestionsEdit): Promise<IQuestionsResponse> => {

    const {question} = data

    const repository = dataSourceConfig.getRepository(Questions)

    const [foundQuestion] = await repository.find({
        where: { id: id },
        withDeleted: true,
    });

    if(!foundQuestion){
        throw new AppError('Pergunta não encontrada', 404)
    }

    const editQuestion = repository.create({
        ...foundQuestion,
        ...data,
    });

    await repository.save(editQuestion);

    const editedQuestion = await QuestionsWithoutOptions.validate( editQuestion, { stripUnknown: true });

    return editedQuestion;
};

export default editQuestionsService;
