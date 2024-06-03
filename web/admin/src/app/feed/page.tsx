type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function FeedPage({ searchParams }: PageProps) {
  const offset =
    typeof searchParams["offset"] === "string"
      ? parseInt(searchParams["offset"])
      : undefined;
  const language =
    typeof searchParams["language"] === "string"
      ? searchParams["language"]
      : undefined;
  const keyword =
    typeof searchParams["keyword"] === "string"
      ? searchParams["keyword"]
      : undefined;

  const platformSiteType =
    typeof searchParams["platformSiteType"] === "string"
      ? searchParams["platformSiteType"]
      : undefined;

  return (
    <div>
      <h3>Feed Page</h3>
    </div>
  );
}
