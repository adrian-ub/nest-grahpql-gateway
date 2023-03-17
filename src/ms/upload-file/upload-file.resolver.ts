import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UploadFileService } from './upload-file.service';
import { UploadFile } from './entities/upload-file.entity';
import { CreateUploadFileInput } from './dto/create-upload-file.input';

@Resolver(() => UploadFile)
export class UploadFileResolver {
  constructor(private readonly msUploadService: UploadFileService) {}

  @Mutation(() => UploadFile)
  async createUploadFile(
    @Args('createUploadFileInput') createUploadFileInput: CreateUploadFileInput,
  ) {
    return this.msUploadService.create(createUploadFileInput);
  }
}
