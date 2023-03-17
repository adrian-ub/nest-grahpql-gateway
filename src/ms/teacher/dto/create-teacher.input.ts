import { InputType, Field } from '@nestjs/graphql';
import { RegisterInput } from 'src/ms/authentication/dto/register.input';

@InputType()
export class CreateTeacherInput extends RegisterInput {
  @Field(() => String)
  document: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  secondName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  lastNameTwo: string;

  @Field(() => String)
  birthdate: string;
}
