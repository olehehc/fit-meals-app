"use client";

export default function Error({ error }) {
  return (
    <div className="min-h-[calc(100vh-92px)] flex flex-col items-center justify-center pt-[92px] p-6 text-center">
      <h1 className="text-xl font-semibold mb-4">An error occurred!</h1>
      <p className="mb-6 text-gray-600">{error.message}</p>
    </div>
  );
}
