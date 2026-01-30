import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Keshav Agrawal | AI Strategist",
  description: "BBA Finance Candidate & AI Production Specialist",
};

/**
 * RootLayout component.
 * * ⚠️ PREVIEW NOTE: You may see a "validateDOMNesting" warning in the console below. 
 * This is EXPECTED in this preview window because the tool wraps the app in a <div>.
 * * 🚀 DEPLOYMENT NOTE: DO NOT remove the <html> or <body> tags. 
 * Next.js REQUIRES them. Removing them will cause your Vercel site to fail with a 404 error.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Tailwind CSS via CDN for styling in the production environment */}
        <script 
          src="https://cdn.tailwindcss.com" 
          crossOrigin="anonymous"
        ></script>
      </head>
      <body 
        className="antialiased bg-slate-950 text-slate-100 min-h-screen" 
        suppressHydrationWarning
      >
        {/* This wrapper div helps ensure the background covers the full viewport 
            even if the body tag is constrained by the preview environment. */}
        <div className="relative isolate min-h-screen bg-slate-950">
          {children}
        </div>
      </body>
    </html>
  );
}