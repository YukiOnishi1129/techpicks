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
      playground: true,
      typePaths: ['./src/**/*.graphql'],
      //   useFactory: async () => ({
      //     typePaths: ['./src/**/*.graphql'],
      //     playground: false,
      //     definitions: {
      //       path: join(process.cwd(), 'src/graphql/types/graphql.ts'),
      //       outputAs: 'class',
      //     },
      //     plugins: [ApolloServerPluginLandingPageLocalDefault()],
      //   }),
    }),
  ],
})
export class GraphQLServerModule {}
