import { BlogDocument } from '../../../../../features/blogs/domain/blog.entity';

export class BlogOutputModel {
  id: string;
  name: string;
  email: string;
}

// MAPPERS

export const BlogOutputModelMapper = (blog: BlogDocument): BlogOutputModel => {
  const outputModel = new BlogOutputModel();

  outputModel.id = blog.id;
  outputModel.name = blog.name;
  outputModel.email = blog.email;

  return outputModel;
};
