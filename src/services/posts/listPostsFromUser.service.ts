// import { Users } from './../../entities/users.entity';
// import { AppError } from './../../errors/AppErrors';
// import dataSourceConfig from '../../data-source';

// export const listPostsFromUserService = async (userId: string) => {
//   const userRep = dataSourceConfig.getRepository(Users);

//   const user = await userRep.findOne({
//     where: {
//       id: userId,
//     },
//     relations: {
//       posts: true,
//     },
//   });

//   if (!user) {
//     throw new AppError('User not found', 404);
//   }

//   return user?.posts;
// };
