"use client";

import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import React, { FC } from "react";

import { Button } from "@/components/ui/button";
import {
  useCarousel,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { FavoriteArticleFolderType } from "@/types/favoriteArticleFolder";
import { LanguageStatus } from "@/types/language";
import { TrendArticleType } from "@/types/trendArticle";

import { TrendArticleList } from "./List/TrendArticleList";
import { fetchTrendArticlesAPI } from "../actions/trendArticles";

type TrendArticleSwiperProps = {
  languageStatus: LanguageStatus;
  keyword?: string;
  feedIdList: Array<string>;
  enTrendArticles: Array<TrendArticleType>;
  jpTrendArticles: Array<TrendArticleType>;
  favoriteArticleFolders: Array<FavoriteArticleFolderType>;
  user?: User;
};

export const TrendArticleSwiper: FC<TrendArticleSwiperProps> = ({
  languageStatus,
  keyword,
  feedIdList,
  enTrendArticles,
  jpTrendArticles,
  favoriteArticleFolders,
  user,
}) => {
  return (
    <Carousel>
      <div className="fixed z-10 mt-2 w-[90%] md:mt-0 md:w-[70%]">
        <SlideTabs languageStatus={languageStatus} />
      </div>
      <div className="h-12" />
      <CarouselContent>
        <CarouselItem>
          <TrendArticleList
            languageStatus={2}
            keyword={keyword}
            feedIdList={feedIdList}
            initialTrendArticles={enTrendArticles}
            favoriteArticleFolders={favoriteArticleFolders}
            user={user}
            tab="trend"
            fetchTrendArticles={fetchTrendArticlesAPI}
          />
        </CarouselItem>
        <CarouselItem>
          <TrendArticleList
            languageStatus={1}
            keyword={keyword}
            feedIdList={feedIdList}
            initialTrendArticles={jpTrendArticles}
            favoriteArticleFolders={favoriteArticleFolders}
            user={user}
            tab="trend"
            fetchTrendArticles={fetchTrendArticlesAPI}
          />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};

type SlideTabsProps = {
  languageStatus: LanguageStatus;
};

const SlideTabs: FC<SlideTabsProps> = ({ languageStatus }) => {
  const { api } = useCarousel();
  const router = useRouter();

  const currentSlide = languageStatus === 1 ? 1 : 0;

  //   useEffect(() => {
  //     if (api && currentSlide === 1) {
  //       api.scrollTo(1);
  //     }
  //   }, [currentSlide, api]);

  return (
    <div className="bg-card">
      <Button
        disabled={currentSlide === 0}
        variant={currentSlide === 0 ? "secondary" : "outline"}
        className="w-1/2"
        onClick={async () => {
          //   await serverRevalidatePage("/dashboard/trend?languageStatus=2");
          //   router.replace(`/dashboard/trend?languageStatus=2`);
          api && api.scrollTo(0);
        }}
      >
        En
      </Button>
      <Button
        disabled={currentSlide === 1}
        variant={currentSlide === 1 ? "secondary" : "outline"}
        className="w-1/2"
        onClick={async () => {
          //   await serverRevalidatePage("/dashboard/trend?languageStatus=2");
          //   router.replace(`/dashboard/trend?languageStatus=1`);
          api && api.scrollTo(1);
        }}
      >
        Jp
      </Button>
    </div>
  );
};
