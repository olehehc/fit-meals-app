import MainHeader from "@/components/main-header/main-header";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "StayFit",
  description: "A social platform for nutrition and workouts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Toaster
          position="top-center"
          toastOptions={{
            className: "text-center flex justify-center",
          }}
        />
        <MainHeader />
        {children}
        <footer className="bg-gray-200 p-4 text-center mt-auto">
          © 2025 StayFit. Portfolio project. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
