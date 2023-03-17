import { InputType, Field } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUpload } from 'src/common/entities/file-upload.entity';

@InputType()
export class CreateStudentInput {
  @Field(() => String)
  firstName: string;

  @Field(() => String)
  secondName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  lastNameTwo: string;

  @Field(() => String)
  documento: string;

  @Field(() => GraphQLUpload)
  photoUrl: Promise<FileUpload>;

  @Field(() => String)
  birthdate: string;
}
