import { Test, TestingModule } from '@nestjs/testing';

import { ArticleResolver } from './article.resolver';
import { ArticleService } from './article.service';

describe('ArticleResolver', () => {
  let resolver: ArticleResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticleResolver, ArticleService],
    }).compile();

    resolver = module.get<ArticleResolver>(ArticleResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
