import { MyFeedFolderDetailTemplate } from "@/features/myFeedFolders/components/MyFeedFolderDetailTemplate";

type MyFeedFolderDetailPageProps = {
  params: {
    id: string;
  };
};

export default function MyFeedFolderDetailPage({
  params,
}: MyFeedFolderDetailPageProps) {
  const { id } = params;
  return <MyFeedFolderDetailTemplate id={id} />;
}
