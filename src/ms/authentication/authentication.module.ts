import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationResolver } from './authentication.resolver';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [AuthenticationResolver, AuthenticationService],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
