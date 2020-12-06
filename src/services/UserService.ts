import { Repository, getRepository } from "typeorm";
import { User } from "../entities/User";
import { Role } from "../entities/Role";
import { CreateUserDto } from "../dto/CreateUserDto";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config';
import { AuthUser } from './../auth/AuthUser';

class UserService {
  private static instance: UserService;
  private userRepository!: Repository<User>;

  private constructor() { }

  static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  async getUsers(): Promise<User[]> {
    const users = await getRepository(User).find();
    return users;
  }

  async getUser(id: number): Promise<User> {
    const user = await getRepository(User).findOne({ id });
    if (!user) throw new Error('userNotFound [getUser]');
    return user;
  }

  async validateLoginCredentials(login: string, password: string): Promise<string> {
    const user = await getRepository(User).findOne({ login });
    if (!user) throw new Error('invalidCredentials [validateLoginCredentials]');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('invalidCredentials [validateLoginCredentials]');

    const payload: AuthUser = {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.roleId,
    }

    const secret: string = config.get('jwtSecret');
    const token = jwt.sign(payload, secret, { expiresIn: '1h' })
    return token;
  }

  async createUser(userDto: CreateUserDto): Promise<User> {
    let user = new User();

    user.firstname = userDto.firstname;
    user.lastname = userDto.lastname;
    user.login = userDto.login;
    user.password = await bcrypt.hash(userDto.password, 10);
    user.email = userDto.email;
    const role = new Role();
    role.id = userDto.roleId;
    user.role = role;
    user.active = userDto.active;

    user = await getRepository(User).save(user);
    return user;
  }

  async updateUser(id: number, userDto: CreateUserDto): Promise<User> {
    let user = await getRepository(User).findOne({ id })
    if (!user) throw new Error('userNotFound [updateUser]');

    user.firstname = userDto.firstname;
    user.lastname = userDto.lastname;
    user.login = userDto.login;
    user.password = userDto.password;
    user.email = userDto.email;
    const role = new Role();
    role.id = userDto.roleId;
    user.role = role;
    user.active = userDto.active;

    user = await getRepository(User).save(user);
    return user;
  }

  async deleteUser(id: number): Promise<User> {
    const user = await getRepository(User).findOne({ id });
    if (!user) throw new Error('userNotFound [deleteUser]');

    await getRepository(User).remove(user);
    return user;
  }

  async getUsersByRole(roleId: number): Promise<User[]> {
    const users = await getRepository(User).find({ roleId });
    return users;
  }
}

export default UserService.getInstance();
