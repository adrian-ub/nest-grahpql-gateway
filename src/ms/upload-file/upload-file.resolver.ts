import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UploadFileService } from './upload-file.service';
import { UploadFile } from './entities/upload-file.entity';
import { CreateUploadFileInput } from './dto/create-upload-file.input';
import { HttpException, HttpStatus } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { join } from 'path';

@Resolver(() => UploadFile)
export class UploadFileResolver {
  constructor(private readonly msUploadService: UploadFileService) {}

  @Mutation(() => UploadFile)
  async createUploadFile(
    @Args('createUploadFileInput') { file }: CreateUploadFileInput,
  ) {
    const { createReadStream, filename } = await file;

    return new Promise(async (resolve) => {
      createReadStream()
        .pipe(createWriteStream(join(process.cwd(), 'src', 'upload', filename)))
        .on('finish', () =>
          resolve({
            file: filename,
          }),
        )
        .on('error', () => {
          new HttpException('Could not save image', HttpStatus.BAD_REQUEST);
        });
    });
  }

  @Query(() => [UploadFile], { name: 'uploadFile' })
  findAll() {
    return this.msUploadService.findAll();
  }
}
