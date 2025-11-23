import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { dateTransformer } from '../../utils/transformers';
import { Rank } from '../../utils/enums';
import { BaseEntityWithOutID } from '../../utils/common';
import { Change } from '../../changes/entities/change.entity';

@ObjectType()
@Entity()
export class User extends BaseEntityWithOutID {
  @Field(() => ID, { description: 'Unique identifier for the user' })
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Field(() => String, { description: 'Unique email for the user' })
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  firstName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  middleName?: string;

  @Field()
  @Column()
  lastName: string;

  @Field(() => Date)
  @Column({
    type: 'date',
    nullable: false,
    transformer: dateTransformer,
  })
  dateOfBirth: Date;

  @Field(() => Rank)
  @Column({
    type: 'enum',
    enum: Rank,
    default: Rank.F,
  })
  rank: Rank;

  // Relationships
  @Field(() => [Change], { nullable: true })
  @OneToMany(() => Change, (change) => change.user, { nullable: true })
  changes?: Change[];
}
