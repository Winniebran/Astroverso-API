import { Astros } from './../../entities/astros.entity';
import { AppError } from './../../errors/AppErrors';
import dataSourceConfig from '../../data-source';

export const listPostsFromAstroService = async (astroId: string) => {
  const astroRep = dataSourceConfig.getRepository(Astros);

  const astro = await astroRep.findOne({
    where: {
      id: astroId,
    },
    relations: {
      posts: true,
    },
  });

  if (!astro) {
    throw new AppError('Astro not found', 404);
  }

  return astro?.posts;
};
