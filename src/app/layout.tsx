import React from 'react';
import type { Metadata } from "next";

// Metadata for the application
export const metadata: Metadata = {
  title: "Keshav Agrawal | AI Strategist",
  description: "BBA Finance Candidate & AI Production Specialist",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script 
          src="https://cdn.tailwindcss.com" 
          crossOrigin="anonymous"
        ></script>
      </head>
      <body 
        className="antialiased bg-slate-950 text-slate-100 min-h-screen"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}