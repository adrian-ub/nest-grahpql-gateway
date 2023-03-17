import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import { lastValueFrom } from 'rxjs';
import { endpoints } from 'src/config';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';

@Injectable()
export class StudentService {
  constructor(private readonly httpService: HttpService) {}
  async create(createStudentInput: CreateStudentInput) {
    try {
      const { data } = await lastValueFrom(
        this.httpService.post(
          `${endpoints.msTeacher}/student`,
          createStudentInput,
        ),
      );

      if (data.success) {
        return data.student;
      }

      const message: string = data.student;
      throw new GraphQLError(message, {});
    } catch (error) {
      throw new GraphQLError(error, {});
    }
  }

  async findAll() {
    const { data } = await lastValueFrom(
      this.httpService.get(`${endpoints.msStudent}/student`),
    );

    if (data.success) {
      return data.students;
    }
    return [];
  }

  async findOne(id: number) {
    const { data } = await lastValueFrom(
      this.httpService.get(`${endpoints.msStudent}/student/${id}`),
    );

    if (data.success) {
      return data.student;
    }
    const message: string = data?.student || 'student no exist';
    throw new GraphQLError(message, { extensions: { code: 404 } });
  }

  async update(id: number, updateStudentInput: UpdateStudentInput) {
    try {
      const { data } = await lastValueFrom(
        this.httpService.put(
          `${endpoints.msStudent}/student/${id}`,
          updateStudentInput,
        ),
      );

      if (data.success) {
        return data.student;
      }
      const message: string = data.student;
      throw new GraphQLError(message, {});
    } catch (error) {
      throw new GraphQLError(error, {});
    }
  }

  async remove(id: number) {
    const { data } = await lastValueFrom(
      this.httpService.delete(`${endpoints.msStudent}/student/${id}`),
    );

    if (data.success) {
      return data.student;
    }

    const message: string = data?.student || 'student no exist';
    throw new GraphQLError(message, { extensions: { code: 404 } });
  }

  async getStudentByDate(date: string) {
    const { data } = await lastValueFrom(
      this.httpService.get(`${endpoints.msStudent}/student/byDate/${date}`),
    );

    if (data.success) {
      return data.student;
    }
    const message: string = data?.student || 'students not found';
    throw new GraphQLError(message, { extensions: { code: 404 } });
  }
}
