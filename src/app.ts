import 'dotenv/config';
import { hello } from './hello';

class App {
  public static start() {
    hello('Adam');
  }
}

App.start();
