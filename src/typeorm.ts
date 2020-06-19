import { createConnection } from 'typeorm';
import path from 'path';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const opts: MysqlConnectionOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'chat',
    entities: [path.join(__dirname, './entity/**/**.ts')],
    synchronize: true,
};

export async function connect() {
    await createConnection(opts);
    console.log('Database connected');
}
