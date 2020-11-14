import 'dotenv/config';
import conn from './services/_db';
import { UserService } from './services/UserService';

class App {
  public static async start() {
    try {
      await conn.connect()
      console.log('Db connected ...');

      const userService = UserService.getInstance(conn);

      const users = await userService.getUsers();
      console.log(users);
    }
    catch(ex) {
      console.log(ex);
    }
  }
}

App.start();
