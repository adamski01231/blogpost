import { getRepository } from 'typeorm';
import { Role } from './../entities/Role';
import { CreateRoleDto } from '../dto/CreateRoleDto';

class RoleService {
  private static instance: RoleService;

  private constructor() { }

  static getInstance(): RoleService {
    if (!RoleService.instance) {
      RoleService.instance = new RoleService();
    }
    return RoleService.instance
  }

  async getRoles() {
    const roles = await getRepository(Role).find();
    return roles;
  }

  async getRole(id: number): Promise<Role> {
    const role = await getRepository(Role).findOne({ id });
    if (!role) throw new Error('roleNotFound [getRole]');
    return role;
  }

  async createRole(roleDto: CreateRoleDto): Promise<Role> {
    let role = new Role();

    role.id = roleDto.id;
    role.label = roleDto.label;

    role = await getRepository(Role).save(role);
    return role;
  }

  async updateRole(roleDto: CreateRoleDto): Promise<Role> {
    let role = await getRepository(Role).findOne({ id: roleDto.id });
    if (!role) throw new Error('roleNotFound [updateRole]');

    role.label = roleDto.label;

    role = await getRepository(Role).save(role);
    return role;
  }

  async deleteRole(id: number): Promise<Role> {
    const role = await getRepository(Role).findOne({ id });
    if (!role) throw new Error('roleNotFound [deleteRole]');

    await getRepository(Role).remove(role);
    return role;
  }
}

export default RoleService.getInstance();
