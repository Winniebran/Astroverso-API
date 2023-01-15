import { AppError } from './../../errors/AppErrors';
import { Posts } from './../../entities/posts.entity';
import setDataSourceConfig from '../../data-source';

export const deletePostService = async (postId: string): Promise<void> => {
  const postRep = setDataSourceConfig.getRepository(Posts);

  const postToDelete = await postRep.findOneBy({
    id: postId,
  });

  if (!postToDelete) {
    throw new AppError('Post not found!', 404);
  }

  await postRep.delete(postId);
};
