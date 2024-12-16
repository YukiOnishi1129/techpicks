import { Injectable } from '@nestjs/common';
import {
  MyFeedFoldersInput,
  MyFeedFolderConnection,
} from 'src/graphql/types/graphql';

@Injectable()
export class MyFeedFolderService {
  async getMyFeedFolders(
    userId: string,
    input: MyFeedFoldersInput,
  ): Promise<MyFeedFolderConnection> {
    console.log('getMyFeedFolder', userId, input);
    return {
      edges: [],
      pageInfo: {
        endCursor: null,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  }
}
