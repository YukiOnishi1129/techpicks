import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Context } from '@nestjs/graphql';
import {
  MyFeedFolderConnection,
  MyFeedFoldersInput,
} from 'src/graphql/types/graphql';

import { MyFeedFolderService } from './folder/my-feed-folder.service';
import { GraphQLContext } from '../../graphql/context.interface';
import { SupabaseAuthGuard } from '../auth/auth.guard';

@Resolver()
export class PersonalFeedResolver {
  constructor(private readonly myFeedFolderService: MyFeedFolderService) {}

  @Query(() => String)
  @UseGuards(SupabaseAuthGuard)
  async myFeedFolders(
    @Args('myFeedFoldersInput') myFeedFoldersInput: MyFeedFoldersInput,
    @Context() context: GraphQLContext,
  ): Promise<MyFeedFolderConnection> {
    const user = context.req.user;
    return await this.myFeedFolderService.getMyFeedFolders(
      user.id,
      myFeedFoldersInput,
    );
  }
}
