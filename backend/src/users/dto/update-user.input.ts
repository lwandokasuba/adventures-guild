import { CreateUserInput } from './create-user.input';
import { InputType, PartialType, OmitType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(
  OmitType(CreateUserInput, ['rank'] as const),
) {
  @Field(() => ID)
  uid: string;
}
