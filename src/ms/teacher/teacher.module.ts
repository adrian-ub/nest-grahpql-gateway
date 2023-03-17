import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherResolver } from './teacher.resolver';
import { HttpModule } from '@nestjs/axios';
import { AuthenticationModule } from '../authentication/authentication.module';

@Module({
  imports: [HttpModule, AuthenticationModule],
  providers: [TeacherResolver, TeacherService],
})
export class TeacherModule {}
