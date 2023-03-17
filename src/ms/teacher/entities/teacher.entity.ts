import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class TeacherResponse {
  success: boolean;
  teacher: Teacher;
}

@ObjectType()
export class Teacher {
  @Field(() => Number)
  id: number;

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

  @Field(() => String)
  idUser: string;

  @Field(() => String)
  accessToken: string;
}
