import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { endpoints } from 'src/config';
import { AuthenticationService } from '../authentication/authentication.service';
import { CreateTeacherInput } from './dto/create-teacher.input';
import { UpdateTeacherInput } from './dto/update-teacher.input';
import { TeacherResponse } from './entities/teacher.entity';

@Injectable()
export class TeacherService {
  constructor(
    private readonly httpService: HttpService,
    private readonly authenticationService: AuthenticationService,
  ) {}

  async create(createTeacherInput: CreateTeacherInput) {
    try {
      const { username, password, confirmationPassword, ...teacher } =
        createTeacherInput;

      const userRegistered = await this.authenticationService.register({
        username,
        password,
        confirmationPassword,
      });

      const { data } = await firstValueFrom(
        this.httpService.post<TeacherResponse>(
          `${endpoints.msTeacher}/teacher`,
          {
            ...teacher,
            idUser: userRegistered.userId,
          },
        ),
      );

      if (data.success) {
        return { ...data.teacher, accessToken: userRegistered.accessToken };
      }
      const message = data.teacher as unknown as string;
      throw new GraphQLError(message, { extensions: { code: 404 } });
    } catch (error) {
      throw new GraphQLError(error, { extensions: { code: 404 } });
    }
  }

  async findAll() {
    const { data } = await lastValueFrom(
      this.httpService.get(`${endpoints.msTeacher}/teacher`),
    );

    if (data.success) {
      return data.teachers;
    }

    return [];
  }

  async findOne(id: number) {
    const { data } = await lastValueFrom(
      this.httpService.get(`${endpoints.msTeacher}/teacher/${id}`),
    );

    if (data.success) {
      return data.teacher;
    }
    const message: string = data?.teacher || 'teacher no exist';
    throw new GraphQLError(message, { extensions: { code: 404 } });
  }

  async update(id: number, updateTeacherInput: UpdateTeacherInput) {
    try {
      const { data } = await lastValueFrom(
        this.httpService.put(
          `${endpoints.msTeacher}/teacher/${id}`,
          updateTeacherInput,
        ),
      );

      if (data.success) {
        return data.teacher;
      }

      const message: string = data.teacher;
      throw new GraphQLError(message, { extensions: { code: 404 } });
    } catch (error) {
      throw new GraphQLError(error, { extensions: { code: 404 } });
    }
  }

  async remove(id: number) {
    const { data } = await lastValueFrom(
      this.httpService.delete(`${endpoints.msTeacher}/teacher/${id}`),
    );

    if (data.success) {
      return data.teacher;
    }

    const message: string = data?.teacher || 'teacher no exist';
    throw new GraphQLError(message, { extensions: { code: 404 } });
  }
}
