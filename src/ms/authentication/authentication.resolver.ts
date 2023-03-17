import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthenticationService } from './authentication.service';
import { Authentication } from './entities/authentication.entity';
import { RegisterInput } from './dto/register.input';
import { LoginInput } from './dto/login.input';

@Resolver(() => Authentication)
export class AuthenticationResolver {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Mutation(() => Authentication)
  register(
    @Args('createRegisterInput')
    createAuthenticationInput: RegisterInput,
  ) {
    return this.authenticationService.register(createAuthenticationInput);
  }

  @Mutation(() => Authentication)
  login(
    @Args('createLoginInput')
    loginInput: LoginInput,
  ) {
    return this.authenticationService.login(loginInput);
  }
}
