"use client";

import SentimentDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentDissatisfiedOutlined";

export default function Error({ error }) {
  return (
    <div className="min-h-[calc(100vh-92px)] flex flex-col items-center justify-center pt-[92px] p-6 text-center">
      <SentimentDissatisfiedOutlinedIcon
        sx={{ fontSize: 56 }}
        className="text-gray-800 opacity-80 mb-3"
      />
      <h1 className="text-xl font-semibold mb-4">An error occurred!</h1>
      <p className="mb-6 text-gray-600">{error.message}</p>
    </div>
  );
}
