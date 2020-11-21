import { Resolver, Query, Arg, Int, FieldResolver, Root } from "type-graphql";
import { Role } from "../entities/Role";
import RoleService from './../services/RoleService';
import UserService from '../services/UserService';

@Resolver(Role)
export class RoleResolver {
  @Query(() => [Role])
  async roles() {
    const roles = await RoleService.getRoles();
    return roles;
  }

  @Query(() => Role)
  async role(
    @Arg('id') id: number
  ) {
    const role = await RoleService.getRole(id);
    return role;
  }

  @FieldResolver()
  async users(@Root() role: Role) {
    const users = await UserService.getUsersByRole(role.id);
    return users;
  }
}
