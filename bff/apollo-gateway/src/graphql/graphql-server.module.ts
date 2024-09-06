import { join } from 'path/posix';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
// import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      definitions: {
        outputAs: 'class',
        path: join(process.cwd(), 'src/graphql/types/graphql.ts'),
      },
      driver: ApolloDriver,
      playground:
        process.env.NODE_ENV !== 'production' &&
        process.env.NODE_ENV !== 'staging',
      typePaths: [join(process.cwd(), 'src/**/*.graphql')],
    }),
  ],
})
export class GraphQLServerModule {}
