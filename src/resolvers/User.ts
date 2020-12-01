import { Resolver, Query, FieldResolver, Root } from 'type-graphql';
import { User } from "../entities/User";
import UserService from './../services/UserService';
import RoleService from '../services/RoleService';
import PostService from '../services/PostService';
import VoteService from '../services/VoteService';

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async users() {
    const users = await UserService.getUsers();
    return users;
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
