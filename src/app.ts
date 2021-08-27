import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './graphql/resolvers/user.resolver';
import { MessageResolver } from './graphql/resolvers/messsage.resolver';
import { RoomResolver } from './graphql/resolvers/room.resolver';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

export const startServer = async () => {
	const app = express();

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
