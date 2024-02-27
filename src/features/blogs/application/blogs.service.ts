import { Injectable } from '@nestjs/common';
import { BlogsRepository } from '../infrastructure/blogs.repository';

@Injectable()
export class BlogsService {
  constructor(private blogsRepository: BlogsRepository) {}

  async create(email: string, name: string) {
    // email send message
    // this.emailAdapter.send(message);
    email;
    name;
    return 'id';
  }
}
