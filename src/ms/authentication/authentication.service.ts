import { Injectable } from '@nestjs/common';
import { RegisterInput } from './dto/register.input';
import { LoginInput } from './dto/login.input';
import { Authentication } from './entities/authentication.entity';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { endpoints } from 'src/config';

@Injectable()
export class AuthenticationService {
  constructor(private readonly httpService: HttpService) {}
  async register(registerInput: RegisterInput) {
    const { data } = await firstValueFrom(
      this.httpService.post<Authentication>(
        `${endpoints.msAuthentication}/auth/signup`,
        registerInput,
      ),
    );

    return data;
  }

  async login(loginInput: LoginInput) {
    const { data } = await firstValueFrom(
      this.httpService.post<Authentication>(
        `${endpoints.msAuthentication}/auth/login`,
        loginInput,
      ),
    );

    return data;
  }
}
