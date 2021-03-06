import { Resolver, Query, FieldResolver, Root, Mutation, Arg, ObjectType } from 'type-graphql';
import { User } from "../entities/User";
import UserService from './../services/UserService';
import RoleService from '../services/RoleService';
import PostService from '../services/PostService';
import VoteService from '../services/VoteService';
import { CreateUserDto } from './../dto/CreateUserDto';

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async users() {
    const users = await UserService.getUsers();
    return users;
  }

  @Query(() => User)
  async user(@Arg('id') id: number) {
    const user = await UserService.getUser(id);
    return user;
  }

  @Mutation(() => User)
  async register(@Arg('input') userDto: CreateUserDto) {
    const user = await UserService.createUser(userDto);
    return user;
  }

  @Query(() => String)
  async login(
    @Arg('login') login: string,
    @Arg('password')password: string
  ) {
    const token = await UserService.validateLoginCredentials(login, password);
    return token;
  }

  @FieldResolver()
  async role(@Root() user: User) {
    const role = await RoleService.getRole(user.roleId);
    return role;
  }

  @FieldResolver()
  async posts(@Root() user: User) {
    const posts = await PostService.getPostsByAuthor(user.id);
    return posts;
  }

  @FieldResolver()
  async votes(@Root() user: User) {
    const votes = await VoteService.getVotesByAuthor(user.id);
    return votes;
  }
}
