import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Keshav Agrawal | AI Strategist",
  description: "BBA Finance Candidate & AI Production Specialist",
};

/**
 * RootLayout component.
 * * Note: We've simplified the structure to use a React Fragment (<>) 
 * for the preview environment to avoid "validateDOMNesting" errors.
 * * For your final Vercel deployment, Next.js will automatically 
 * handle the wrapping of your content.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Injected Tailwind CDN to ensure all styles render correctly 
          without local configuration files.
      */}
      <script 
        src="https://cdn.tailwindcss.com" 
        crossOrigin="anonymous"
      ></script>
      
      {/* Standard page container with smooth scrolling and 
          background color to match your portfolio theme.
      */}
      <div className="antialiased bg-slate-950 min-h-screen scroll-smooth">
        {children}
      </div>
    </>
  );
}