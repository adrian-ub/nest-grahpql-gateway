import { Injectable } from '@nestjs/common';
import { CreateUploadFileInput } from './dto/create-upload-file.input';

@Injectable()
export class UploadFileService {
  create(createUploadFileInput: CreateUploadFileInput) {
    return { file: true };
  }

  findAll() {
    return [];
  }
}
