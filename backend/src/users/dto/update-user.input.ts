import { CreateUserInput } from './create-user.input';
import { InputType, PartialType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => ID)
  uid: string;
}
