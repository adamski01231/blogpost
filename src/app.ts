import 'dotenv/config';
import { hello } from './hello';
import connection from './db';

class App {
  public static async start() {
    hello('Adam');

    try {
      const conn = await connection();
      console.log('Db connected');
    }
    catch(ex) {
      console.log(ex.message);
    }
  }
}

App.start();
