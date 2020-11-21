import { Resolver, Query, FieldResolver, Root } from 'type-graphql';
import { User } from "../entities/User";
import UserService from './../services/UserService';
import RoleService from '../services/RoleService';

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
}
