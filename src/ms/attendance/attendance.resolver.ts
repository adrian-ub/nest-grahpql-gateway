import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AttendanceService } from './attendance.service';
import { Attendance } from './entities/attendance.entity';
import { CreateAttendanceInput } from './dto/create-attendance.input';

@Resolver(() => Attendance)
export class AttendanceResolver {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Mutation(() => Attendance)
  async checkAttendance(
    @Args('attendance') attendance: CreateAttendanceInput,
    @Args('id') id: number,
  ) {
    return this.attendanceService.create(id, attendance);
  }

  @Query(() => [Attendance])
  async getAttendanceByDate(@Args('date') date: string) {
    return this.attendanceService.getAttendanceByDate(date);
  }

  @Query(() => Attendance)
  async getAttendanceByDateAndStudent(
    @Args('date') date: string,
    @Args('idStudent') idStudent: number,
  ) {
    return this.attendanceService.getAttendanceByDateAndStudent(
      idStudent,
      date,
    );
  }

  @Query(() => [Attendance], { name: 'attendances' })
  findAll() {
    return this.attendanceService.findAll();
  }
}
