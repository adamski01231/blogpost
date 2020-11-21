import { ConnectionOptions, getConnectionManager } from 'typeorm';
import config from 'config';

const dbConfig: ConnectionOptions = config.get('db');

export default getConnectionManager().create(dbConfig);
