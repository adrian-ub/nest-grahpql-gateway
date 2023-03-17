import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAttendanceInput {
  @Field(() => String)
  dateAttendance: string;

  @Field(() => Number)
  idTeacher: number;
}
