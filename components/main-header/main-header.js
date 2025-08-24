import Link from "next/link";

export default function MainHeader() {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">FitMeals</h1>
      <nav className="flex gap-4">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <Link href="/auth/sign-in" className="hover:underline">
          Sign In
        </Link>
        <Link href="/auth/sign-up" className="hover:underline">
          Sign Up
        </Link>
      </nav>
    </header>
  );
}
