import { Injectable } from '@nestjs/common';
import { FeedConnection, FeedsInput } from 'src/graphql/types/graphql';

@Injectable()
export class FeedService {
  constructor() {}

  async getFeeds(userId: string, input: FeedsInput): Promise<FeedConnection> {
    console.log('getFeeds', userId, input);
    return new Promise((resolve) => {
      resolve({
        edges: [],
        pageInfo: {
          endCursor: '',
          hasNextPage: false,
          hasPreviousPage: false,
        },
      });
    });
  }
}
