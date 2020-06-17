import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { ProducdResolver } from './graphql/resolvers/Product.resolver';
import { UserResolver } from './graphql/resolvers/user.resolver';

export const startServer = async () => {
    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [ProducdResolver, UserResolver],
            validate: false,
        }),
        context: (context) => context,
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
