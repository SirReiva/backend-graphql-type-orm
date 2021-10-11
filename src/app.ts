import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './graphql/resolvers/user.resolver';
import { MessageResolver } from './graphql/resolvers/messsage.resolver';
import { RoomResolver } from './graphql/resolvers/room.resolver';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { UserEntity } from './entity/user.entity';

export const startServer = async () => {
	const app = express();

	app.get('/test', async (_, res) => {
		//4dbcdcd5-c60a-493f-bdbe-fcea837295da
		const resp = await UserEntity.createQueryBuilder('user')
			.where({
				id: '70a06376-0f23-4e13-8fe6-7d8a0b74b9a9',
			})
			.leftJoinAndSelect('user.rooms', 'room')
			.leftJoinAndSelect('room.lastMessage', 'lastMessage')
			.getOne();
		res.json(resp);
	});

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [UserResolver, MessageResolver, RoomResolver],
			validate: false,
		}),
		context: context => context,
		formatError: err => err,
		plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
	});

	await apolloServer.start();

	apolloServer.applyMiddleware({
		app,
		path: '/graphql',
	});

	return app;
};
