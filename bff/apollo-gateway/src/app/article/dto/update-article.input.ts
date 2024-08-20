import { PartialType } from '@nestjs/mapped-types';

import { CreateArticleInput } from './create-article.input';

export class UpdateArticleInput extends PartialType(CreateArticleInput) {
  id: number;
}
