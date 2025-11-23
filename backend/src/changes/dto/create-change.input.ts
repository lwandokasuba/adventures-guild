import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateChangeInput {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  referenceId: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  user_id?: string;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  changed_by_user_id: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  from: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  to: string;
}
