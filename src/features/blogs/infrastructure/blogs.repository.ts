import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from '../domain/blog.entity';

@Injectable()
export class BlogsRepository {
  constructor(@InjectModel(Blog.name) private blogModel: Model<Blog>) {}

  public async insert(blog: Blog) {
    const result: BlogDocument[] = await this.blogModel.insertMany(blog);
    return result[0];
  }
}
