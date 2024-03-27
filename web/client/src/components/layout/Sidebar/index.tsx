import Link from "next/link";

export function Sidebar() {
  return (
    <div>
      <ul>
        <Link href="/">Today</Link>
        <Link href="/bookmark">Read Later</Link>
      </ul>
    </div>
  );
}
