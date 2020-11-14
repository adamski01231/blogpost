import { Repository, Connection } from 'typeorm';
import { Role } from './../entities/Role';
import { CreateRoleDto } from '../dto/CreateRoleDto';

export class RoleService {
  private static instance: RoleService | null;
  private roleRepository: Repository<Role>;

  private constructor(conn: Connection) {
    this.roleRepository = conn.getRepository(Role);
  }

  static getInstance(conn: Connection): RoleService {
    if (!RoleService.instance) {
      RoleService.instance = new RoleService(conn);
    }
    return RoleService.instance
  }

  async getRoles() {
    const roles = await this.roleRepository.find();
    return roles;
  }

  async getRole(id: number): Promise<Role> {
    const role = await this.roleRepository.findOne({ id });
    if (!role) throw new Error('roleNotFound [getRole]');
    return role;
  }

  async createRole(roleDto: CreateRoleDto): Promise<Role> {
    let role = new Role();

    role.id = roleDto.id;
    role.label = roleDto.label;

    role = await this.roleRepository.save(role);
    return role;
  }

  async updateRole(roleDto: CreateRoleDto): Promise<Role> {
    let role = await this.roleRepository.findOne({ id: roleDto.id });
    if (!role) throw new Error('roleNotFound [updateRole]');

    role.label = roleDto.label;

    role = await this.roleRepository.save(role);
    return role;
  }

  async deleteRole(id: number): Promise<Role> {
    const role = await this.roleRepository.findOne({ id });
    if (!role) throw new Error('roleNotFound [deleteRole]');

    await this.roleRepository.remove(role);
    return role;
  }
}
