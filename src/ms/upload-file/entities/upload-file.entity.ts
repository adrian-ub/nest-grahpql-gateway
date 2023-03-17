import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UploadFile {
  @Field(() => String)
  file: string;
}
