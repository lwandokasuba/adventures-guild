import { Resolver, Query, Mutation, Args, ID, Info } from '@nestjs/graphql';
import * as graphql from 'graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { getSelectedFields } from '../utils/grapqhl-typeorm-projection';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
    @Info() info: graphql.GraphQLResolveInfo,
  ) {
    const user = await this.usersService.create(createUserInput);
    return await this.findOne(user.uid, info);
  }

  @Query(() => [User], { name: 'users' })
  findAll(@Info() info: graphql.GraphQLResolveInfo) {
    const fieldsToSelect = getSelectedFields(info);
    return this.usersService.findAll(fieldsToSelect);
  }

  @Query(() => User, { name: 'user' })
  async findOne(
    @Args('uid', { type: () => ID }) id: string,
    @Info() info: graphql.GraphQLResolveInfo,
  ) {
    const fieldsToSelect = getSelectedFields(info);
    return await this.usersService.findOne(id, fieldsToSelect);
  }

  @Mutation(() => User)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return await this.usersService.update(updateUserInput.uid, updateUserInput);
  }

  @Mutation(() => User)
  async removeUser(@Args('id', { type: () => ID }) id: string) {
    return await this.usersService.remove(id);
  }
}
