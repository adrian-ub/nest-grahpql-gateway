import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentResolver } from './student.resolver';
import { HttpModule } from '@nestjs/axios';
import { UploadFileModule } from '../upload-file/upload-file.module';

@Module({
  imports: [HttpModule, UploadFileModule],
  providers: [StudentResolver, StudentService],
})
export class StudentModule {}
