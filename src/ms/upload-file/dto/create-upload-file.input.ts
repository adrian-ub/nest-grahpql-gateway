import { InputType, Field } from '@nestjs/graphql';
import { FileUpload } from '../../../common/entities/file-upload.entity';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';

@InputType()
export class CreateUploadFileInput {
  @Field(() => GraphQLUpload)
  file: Promise<FileUpload>;
}
