import Link from "next/link";

export default function MainHeader({ children }) {
  return (
    <header className="bg-black p-4 flex justify-between items-center">
      <Link href="/" className="text-white text-xl font-bold">
        💪 FitMeals
      </Link>
      <nav className="flex gap-4">{children}</nav>
    </header>
  );
}
