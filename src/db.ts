import 'reflect-metadata';
import { createConnection, ConnectionOptions, Connection } from 'typeorm';
import config from 'config';

const dbConfig: ConnectionOptions = config.get('db');

export default (): Promise<Connection> => createConnection(dbConfig);
