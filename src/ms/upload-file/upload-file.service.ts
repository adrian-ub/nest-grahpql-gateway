import { Injectable } from '@nestjs/common';
import { createWriteStream, createReadStream as FsCreateReadStream } from 'fs';
import { join } from 'path';
import { CreateUploadFileInput } from './dto/create-upload-file.input';
import * as FormData from 'form-data';
import { firstValueFrom } from 'rxjs';
import { endpoints } from 'src/config';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class UploadFileService {
  constructor(private readonly httpService: HttpService) {}

  async create({ file }: CreateUploadFileInput) {
    const { createReadStream, filename } = await file;

    return new Promise(async (resolve) => {
      createReadStream()
        .pipe(createWriteStream(join(process.cwd(), 'src', 'upload', filename)))
        .on('finish', async () => {
          const form = new FormData();
          form.append(
            'myImage',
            FsCreateReadStream(join(process.cwd(), 'src', 'upload', filename)),
          );

          console.log(form);

          const { data } = await firstValueFrom(
            this.httpService.post(`${endpoints.msUpload}/uploadphoto`, form, {
              headers: form.getHeaders(),
            }),
          );

          resolve({
            file: data,
          });
        });
    });
  }
}
