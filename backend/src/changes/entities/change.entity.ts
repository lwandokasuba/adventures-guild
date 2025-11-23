import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../utils/common';
import { User } from '../../users/entities/user.entity';

@ObjectType()
@Entity()
export class Change extends BaseEntity {
  @Field(() => ID)
  @Column({ type: 'uuid' })
  referenceId: string;

  @Field()
  @Column()
  from: string;

  @Field()
  @Column()
  to: string;

  // Relationship to User
  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'changed_by_user_id' })
  changedBy: User;
}
