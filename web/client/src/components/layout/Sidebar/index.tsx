import Link from "next/link";

export function Sidebar() {
  return (
    <div className="h-lvh w-full border-r-2 pb-12">
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Main
          </h2>
          <div className="space-y-1 pl-8">
            <div>
              <Link href="/">Today</Link>
            </div>
            <div>
              <Link href="/bookmark">Read Later</Link>
            </div>
          </div>
        </div>

        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Feed
          </h2>
          <div className="space-y-1 pl-8">
            <div>
              <Link href="/myfeed-list">All</Link>
            </div>
          </div>
        </div>

        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Favorite
          </h2>
          <div className="space-y-1 pl-8">
            <div>
              <Link href="/favorite">All</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
