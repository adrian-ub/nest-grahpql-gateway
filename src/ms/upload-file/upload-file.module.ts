import { Module } from '@nestjs/common';
import { UploadFileService } from './upload-file.service';
import { UploadFileResolver } from './upload-file.resolver';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [UploadFileResolver, UploadFileService],
  exports: [UploadFileService],
})
export class UploadFileModule {}
