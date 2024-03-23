import Image from "next/image";
import { db } from "@/lib/firestore";

export default async function Home() {
  const snapshot = await db.collection("platforms").get();
  const platforms = snapshot.docs.map((doc) => doc.data());
  console.log(platforms);
  return <div>Test</div>;
}
