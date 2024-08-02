import { join } from 'path';

import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
new GraphQLDefinitionsFactory().generate({
  customScalarTypeMapping: {
    // Date: 'Date',
  },
  outputAs: 'class',
  path: join(process.cwd(), 'src/graphql/types/graphql.ts'),
  typePaths: ['./src/**/*.graphql'],
});
