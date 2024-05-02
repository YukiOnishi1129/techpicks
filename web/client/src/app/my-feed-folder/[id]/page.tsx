import { MyFeedFolderDetailTemplate } from "@/features/myFeedFolders/components/MyFeedFolderDetailTemplate";

type MyFeedFolderDetailPageProps = {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function MyFeedFolderDetailPage({
  params,
  searchParams,
}: MyFeedFolderDetailPageProps) {
  const { id } = params;
  const keyword =
    typeof searchParams["keyword"] === "string"
      ? searchParams["keyword"]
      : undefined;
  return <MyFeedFolderDetailTemplate id={id} keyword={keyword} />;
}
