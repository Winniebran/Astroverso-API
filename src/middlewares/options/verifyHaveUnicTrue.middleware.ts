// import { NextFunction, Request, Response } from "express";
// import dataSource from "../../data-source";
// import { Questions } from "../../entities/questions.entity";
// import { AppError } from "../../errors/AppErrors";
// import { IOptions } from "../../interfaces/options";

// export const verifyHaveUnicTrueMiddleware = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const data: IOptions = req.body;
//     const myTable = dataSource.getRepository(Questions);

//     const findOptions = await myTable.find({
//       where: {
//         id: data.questionsId,
//         options: {
//           isCorrect: data.isCorrect,
//         },
//       },
//       relations: {
//         options: true,
//       },
//     });

//     if (findOptions[0].options.length) {
//       throw new AppError("To Have a unique option equal true");
//     }

//     next();
//   } catch (error) {
//     throw new AppError(error as string);
//   }
// };
