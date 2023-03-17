import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Authentication {
  @Field(() => String)
  accessToken: string;
  @Field(() => String)
  userId: string;
}
