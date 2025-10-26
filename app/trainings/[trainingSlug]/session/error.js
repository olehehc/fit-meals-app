"use client";

export default function Error({ error, reset }) {
  return (
    <div className="pt-[92px] p-6 text-center">
      <h2 className="text-xl font-semibold mb-4">Something went wrong 😕</h2>
      <p className="mb-6 text-gray-600">{error.message}</p>
    </div>
  );
}
