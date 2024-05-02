type FeedDetailPageProps = {
  params: {
    id: string;
  };
};

export default function FeedDetailPage({ params }: FeedDetailPageProps) {
  const { id } = params;
  return (
    <div className="mx-auto mt-20 w-2/5 rounded-md border-2 border-gray-300 p-4 shadow-md">
      <h2 className="text-center text-2xl font-bold ">FeedList Page</h2>
    </div>
  );
}
