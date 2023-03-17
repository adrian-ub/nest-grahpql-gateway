import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

import {
  AttendanceModule,
  AuthenticationModule,
  StudentModule,
  TeacherModule,
  UploadFileModule,
} from './ms';

@Module({
  imports: [
    UploadFileModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      csrfPrevention: true,
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      installSubscriptionHandlers: true,
      sortSchema: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    AuthenticationModule,
    StudentModule,
    TeacherModule,
    AttendanceModule,
  ],
})
export class AppModule {}
