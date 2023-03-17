import { InputType, Field } from '@nestjs/graphql';

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

  @Field(() => String)
  photoUrl: string;

  @Field(() => String)
  birthdate: string;
}
