import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Context, Mutation } from '@nestjs/graphql';
import {
  MyFeedFolderConnection,
  MyFeedFoldersInput,
  MyFeedFolder,
  CreateMyFeedFolderInput,
  UpdateMyFeedFolderInput,
  DeleteMyFeedFolderInput,
  MyFeedFolderInput,
} from 'src/graphql/types/graphql';

import { MyFeedFolderService } from './folder/my-feed-folder.service';
import { GraphQLContext } from '../../graphql/context.interface';
import { SupabaseAuthGuard } from '../auth/auth.guard';

@Resolver()
export class PersonalFeedResolver {
  constructor(private readonly myFeedFolderService: MyFeedFolderService) {}

  @Query(() => MyFeedFolderConnection)
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

  @Query(() => MyFeedFolder)
  @UseGuards(SupabaseAuthGuard)
  async myFeedFolder(
    @Args('myFeedFolderInput') myFeedFolderInput: MyFeedFolderInput,
    @Context() context: GraphQLContext,
  ): Promise<MyFeedFolder> {
    const user = context.req.user;
    return await this.myFeedFolderService.getMyFeedFolder(
      user.id,
      myFeedFolderInput,
    );
  }

  @Mutation(() => MyFeedFolder)
  @UseGuards(SupabaseAuthGuard)
  async createMyFeedFolder(
    @Args('createMyFeedFolderInput')
    createMyFeedFolderInput: CreateMyFeedFolderInput,
    @Context() context: GraphQLContext,
  ): Promise<MyFeedFolder> {
    const user = context.req.user;
    return await this.myFeedFolderService.createMyFeedFolder(
      user.id,
      createMyFeedFolderInput,
    );
  }

  @Mutation(() => MyFeedFolder)
  @UseGuards(SupabaseAuthGuard)
  async updateMyFeedFolder(
    @Args('updateMyFeedFolderInput')
    updateMyFeedFolderInput: UpdateMyFeedFolderInput,
    @Context() context: GraphQLContext,
  ): Promise<MyFeedFolder> {
    const user = context.req.user;
    return await this.myFeedFolderService.updateMyFeedFolder(
      user.id,
      updateMyFeedFolderInput,
    );
  }

  @Mutation(() => Boolean)
  @UseGuards(SupabaseAuthGuard)
  async deleteMyFeedFolder(
    @Args('deleteMyFeedFolderInput')
    deleteMyFeedFolderInput: DeleteMyFeedFolderInput,
    @Context() context: GraphQLContext,
  ): Promise<boolean> {
    const user = context.req.user;
    return await this.myFeedFolderService.deleteMyFeedFolder(
      user.id,
      deleteMyFeedFolderInput,
    );
  }
}
