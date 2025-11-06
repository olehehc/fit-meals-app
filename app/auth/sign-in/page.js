import SignInCard from "@/components/auth/sign-in-card";

export default async function SignInPage({ searchParams }) {
  const { from } = await searchParams;

  return (
    <main className="flex-1 flex items-center justify-center pt-[92px] p-6 bg-gray-50">
      <SignInCard from={from} />
    </main>
  );
}
