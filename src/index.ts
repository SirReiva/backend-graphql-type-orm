import 'reflect-metadata';
import { startServer } from './app';
import { connect } from './typeorm';

async function main() {
	await connect();
	const app = await startServer();
	app.listen(3000, () => console.log('listen port 3000'));
}

main();
