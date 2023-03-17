import { ObjectType, Field, Int } from '@nestjs/graphql';
import { StudentAttendance } from './student-attendance.entity';

@ObjectType()
export class Attendance {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  dateAttendance: string;

  @Field(() => Number)
  idTeacher: number;

  @Field(() => String)
  status: string;

  @Field(() => StudentAttendance)
  student: StudentAttendance;

  @Field(() => String)
  created_at: string;

  @Field(() => String)
  updated_at: string;
}
