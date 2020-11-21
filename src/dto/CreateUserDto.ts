export interface CreateUserDto {
  login: string,
  password: string,
  firstname: string,
  lastname: string,
  email: string,
  roleId: number,
  active: boolean,
}