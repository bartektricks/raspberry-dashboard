import Link from "next/link";

export default function IndexPage() {
  return (
    <div className="max-w-md rounded-md bg-indigo-900">
      <Link href="/register">Go to register page</Link>
    </div>
  );
}
