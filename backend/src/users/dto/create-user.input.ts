import { InputType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  firstName: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(3)
  middleName?: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  lastName: string;

  @Field(() => Date)
  @Type(() => Date)
  @IsDate()
  dateOfBirth: Date;
}
