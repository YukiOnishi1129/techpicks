ALTER TABLE article_comments DROP CONSTRAINT fk_articles_comments_article_id;

ALTER TABLE article_comments
ADD CONSTRAINT fk_article_comments_article_id FOREIGN KEY (article_id) REFERENCES articles(id) ON UPDATE RESTRICT ON DELETE CASCADE;