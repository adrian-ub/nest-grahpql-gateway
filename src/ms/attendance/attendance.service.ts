import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import { lastValueFrom } from 'rxjs';
import { endpoints } from 'src/config';
import { CreateAttendanceInput } from './dto/create-attendance.input';

@Injectable()
export class AttendanceService {
  constructor(private readonly httpService: HttpService) {}
  async create(
    idStudent: number,
    createAttendanceInput: CreateAttendanceInput,
  ) {
    try {
      const isValidTeacher = await lastValueFrom(
        this.httpService.get(
          `${endpoints.msTeacher}/attendance/${createAttendanceInput.idTeacher}`,
        ),
      );
      const respTeacher = isValidTeacher.data;
      if (!respTeacher.success) {
        throw new GraphQLError('Teacher no exist', {
          extensions: { code: 401 },
        });
      }
      const response = await lastValueFrom(
        this.httpService.post(
          `${endpoints.msAttendance}/attendance/${idStudent}`,
          createAttendanceInput,
        ),
      );
      const respStudent = response.data;
      if (respStudent.success) {
        return respStudent.attendance;
      }
      const message: string = response.data.student;
      throw new GraphQLError(message, {});
    } catch (error) {
      throw new GraphQLError(error, {});
    }
  }

  async findAll() {
    const { data } = await lastValueFrom(
      this.httpService.get(`${endpoints.msAttendance}/attendance`),
    );

    if (data.success) {
      return data.attendance;
    }
    return [];
  }

  async getAttendanceByDate(date: string) {
    const { data } = await lastValueFrom(
      this.httpService.get(`${endpoints.msAttendance}/attendance/${date}`),
    );

    if (data.success) {
      return data.attendance;
    }
    return [];
  }

  async getAttendanceByDateAndStudent(idStudent: number, date: string) {
    const { data } = await lastValueFrom(
      this.httpService.get(
        `${endpoints.msAttendance}/attendance/${date}/${idStudent}`,
      ),
    );

    if (data.success) {
      return data.attendance;
    }
    throw new GraphQLError('Attendance not found', {
      extensions: { code: 404 },
    });
  }
}
