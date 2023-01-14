import { IPosts } from './../../interfaces/posts/index';
import { Posts } from './../../entities/posts.entity';
import dataSourceConfig from '../../data-source';

export const listAllPostsService = async () => {
  const postsRep = dataSourceConfig.getRepository(Posts);
  const postsList = await postsRep.find();

  return postsList;
};
