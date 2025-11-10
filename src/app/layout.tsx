import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { openSans } from "@/fonts/fonts";
import { Suspense } from "react";
import Loading from "@/components/Others/Loading";
import { Toaster } from "sonner";
import ReduxProvider from "@/redux/Provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "DIMC Prep | Online Question Bank for Exam Success.",
    template: "%s",
  },
  description:
    "Maximise your DIMC revision with 800+ expert questions and 3 full mock exams. DIMCPrep provides smart, effective online prep for the Diploma in Immediate Care.",
  keywords: [
    "DIMCPrep",
    "DIMC preparation",
    "Emergency care training",
    "Immediate care diploma",
    "DIMC support",
    "Medical education",
    "Prehospital training",
    "online question bank",
    "diploma immediate medical care",
    "educational platform",
  ],
  authors: [{ name: "DIMCPrep Team", url: "https://www.dimcprep.com" }],
  publisher: "DIMCPrep",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.dimcprep.com",
  },
  openGraph: {
    title: "DIMCPrep.com",
    description:
      "Explore courses and support for the Diploma in Immediate Medical Care. Learn, practice, and succeed with DIMCPrep.",
    url: "https://www.dimcprep.com",
    siteName: "DIMCPrep",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={openSans.variable}>
        <Suspense fallback={<Loading />}>
          <ReduxProvider>
            <Toaster position="top-center" expand={true} richColors />
            {children}
          </ReduxProvider>
        </Suspense>
      </body>
    </html>
  );
}
