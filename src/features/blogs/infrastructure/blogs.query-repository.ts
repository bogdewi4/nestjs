import { Injectable } from '@nestjs/common';
import { Blog } from '../domain/blog.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  BlogOutputModel,
  BlogOutputModelMapper,
} from '../api/models/output/blog.output.model';

// export abstract class BaseQueryRepository<M> {
//     protected constructor(private model: Model<M>) {
//     }
//
//     async find(filter: FilterQuery<M>,
//                projection?: ProjectionType<M> | null | undefined,
//                options?: QueryOptions<M> | null | undefined,
//                pagination: {skip: number, limit: number }) {
//         return this.model.find<M>(filter, projection, options)
//     }
// }

@Injectable()
export class BlogsQueryRepository {
  constructor(@InjectModel(Blog.name) private blogModel: Model<Blog>) {}

  public async getById(blogId: string): Promise<BlogOutputModel | null> {
    const blog = await this.blogModel.findById(blogId, { __v: false });
    return blog ? BlogOutputModelMapper(blog) : null;
  }
}
