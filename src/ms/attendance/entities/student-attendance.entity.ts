import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StudentAttendance {
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
  photoUrl: string;

  @Field(() => String)
  birthdate: string;
}
