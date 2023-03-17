import { RegisterInput } from './register.input';
import { InputType, OmitType } from '@nestjs/graphql';

@InputType()
export class LoginInput extends OmitType(RegisterInput, [
  'confirmationPassword',
]) {}
