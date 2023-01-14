import { AppError } from './../../errors/AppErrors';
import { Categories } from './../../entities/categories.entity';
import dataSourceConfig from '../../data-source';

export const listPostsFromCategoryService = async (categoryId: string) => {
  const categoryRep = dataSourceConfig.getRepository(Categories);

  const category = await categoryRep.findOne({
    where: {
      id: categoryId,
    },
    relations: {
      posts: true,
    },
  });

  if (!category) {
    throw new AppError('Category not found', 404);
  }

  return category?.posts;
};
