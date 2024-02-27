import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { randomUUID } from 'crypto';

export type BlogDocument = HydratedDocument<Blog>;

@Schema()
export class Blog {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  createdAt: Date;

  //TODO: replace with new this()
  static create(name: string, email: string | null) {
    const blog = new Blog();

    blog.name = name;
    blog.email = email ?? `${randomUUID()}_${name}@it-incubator.io`;

    return blog;
  }
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
