import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Student {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  secondName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  lastNameTwo: string;

  @Field(() => String)
  document: string;

  @Field(() => String)
  photoUrl: string;

  @Field(() => String)
  status: string;

  @Field(() => String)
  birthdate: string;
}
