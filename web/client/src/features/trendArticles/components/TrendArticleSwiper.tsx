"use client";

import { User } from "@supabase/supabase-js";
import React, { FC } from "react";

import { Button } from "@/components/ui/button";
import {
  useCarousel,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { FavoriteArticleFolderType } from "@/types/favoriteArticleFolder";
import { TrendArticleType } from "@/types/trendArticle";

import { TrendArticleTemplateContent } from "./TrendArticleTemplateContent";

type TrendArticleSwiperProps = {
  keyword?: string;
  platformIdList: Array<string>;
  enTrendArticles: Array<TrendArticleType>;
  jpTrendArticles: Array<TrendArticleType>;
  favoriteArticleFolders: Array<FavoriteArticleFolderType>;
  user?: User;
};

export const TrendArticleSwiper: FC<TrendArticleSwiperProps> = ({
  keyword,
  platformIdList,
  enTrendArticles,
  jpTrendArticles,
  favoriteArticleFolders,
  user,
}) => {
  return (
    <Carousel>
      <div className="fixed z-10 mt-2 w-[90%] md:mt-0 md:w-[70%]">
        <SlideTabs />
      </div>
      <div className="h-12" />
      <CarouselContent>
        <CarouselItem>
          <TrendArticleTemplateContent
            languageStatus={2}
            keyword={keyword}
            platformIdList={platformIdList}
            trendArticles={enTrendArticles}
            favoriteArticleFolders={favoriteArticleFolders}
            user={user}
          />
        </CarouselItem>
        <CarouselItem>
          <TrendArticleTemplateContent
            languageStatus={1}
            keyword={keyword}
            platformIdList={platformIdList}
            trendArticles={jpTrendArticles}
            favoriteArticleFolders={favoriteArticleFolders}
            user={user}
          />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};

const SlideTabs: FC = () => {
  const { api } = useCarousel();

  const currentSlide = api?.selectedScrollSnap() || 0;

  return (
    <div className="bg-card">
      <Button
        disabled={currentSlide === 0}
        variant={currentSlide === 0 ? "secondary" : "outline"}
        className="w-1/2"
        onClick={() => api && api.scrollTo(0)}
      >
        En
      </Button>
      <Button
        disabled={currentSlide === 1}
        variant={currentSlide === 1 ? "secondary" : "outline"}
        className="w-1/2"
        onClick={() => api && api.scrollTo(1)}
      >
        Jp
      </Button>
    </div>
  );
};
