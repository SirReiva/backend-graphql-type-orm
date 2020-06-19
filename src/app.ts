import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { ProducdResolver } from './graphql/resolvers/Product.resolver';
import { UserResolver } from './graphql/resolvers/user.resolver';
import { MessageResolver } from './graphql/resolvers/messsage.resolver';
import { RoomResolver } from './graphql/resolvers/room.resolver';

export const startServer = async () => {
    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [
                ProducdResolver,
                UserResolver,
                MessageResolver,
                RoomResolver,
            ],
            validate: false,
        }),
        context: (context) => context,
        formatError: (err) => err,
        engine: {
            rewriteError(err) {
                return err;
            },
        },
    });

    apolloServer.applyMiddleware({
        app,
        path: '/graphql',
    });

    return app;
};
