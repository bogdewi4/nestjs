import { IsString, Length } from 'class-validator';
import { Trim } from '../../../../../common/decorators/transform/trim';
import { IsOptionalEmail } from '../../../../../common/decorators/validate/is-optional-email';

export class BlogCreateModel {
  @Trim()
  @IsString()
  @Length(4, 20, { message: 'Length not correct' })
  name: string;

  @IsOptionalEmail()
  email: string;
}
