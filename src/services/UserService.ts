import { Repository, Connection } from "typeorm";
import { User } from "../entities/User";
import { Role } from "../entities/Role";
import { CreateUserDto } from "../dto/CreateUserDto";

export class UserService {
  private static instance: UserService | null;
  private userRepository: Repository<User>;

  private constructor(conn: Connection) {
    this.userRepository = conn.getRepository(User);
  }

  static getInstance(conn: Connection): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService(conn);
    }
    return UserService.instance
  }

  async getUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async getUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ id });
    if (!user) throw new Error('userNotFound [getUser]');
    return user;
  }

  async createUser(userDto: CreateUserDto): Promise<User> {
    let user = new User();

    user.firstname = userDto.firstname;
    user.lastname = userDto.lastname;
    user.login = userDto.login;
    user.password = userDto.password;
    user.email = userDto.email;
    const role = new Role();
    role.id = userDto.roleId;
    user.role = role;
    user.isActive = userDto.isActive;

    user = await this.userRepository.save(user);
    return user;
  }

  async updateUser(id: number, userDto: CreateUserDto): Promise<User> {
    let user = await this.userRepository.findOne({ id })
    if (!user) throw new Error('userNotFound [updateUser]');

    user.firstname = userDto.firstname;
    user.lastname = userDto.lastname;
    user.login = userDto.login;
    user.password = userDto.password;
    user.email = userDto.email;
    const role = new Role();
    role.id = userDto.roleId;
    user.role = role;
    user.isActive = userDto.isActive;

    user = await this.userRepository.save(user);
    return user;
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ id });
    if (!user) throw new Error('userNotFound [deleteUser]');

    await this.userRepository.remove(user);
    return user;
  }
}
