import { Poppins as FontSans } from "next/font/google";
import "@/styles/globals.css";

import { cn } from "@/utils";
import { ThemeProvider } from "@/providers/theme-provider";
import Link from "next/link";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <footer className="flex w-full items-center justify-between bg-primary p-4 font-semibold text-primary-foreground">
            <div>Developed by Prasad Sawant</div>
            <div className="flex gap-4">
              <Link
                href="https://github.com/prasadsawant7"
                target="_blank"
              >
                <GitHubLogoIcon className="h-5 w-5" />
              </Link>
              <Separator
                orientation="vertical"
                className="h-5 bg-primary-foreground"
              />
              <Link
                href="https://www.linkedin.com/in/prasad-sawant7"
                target="_blank"
              >
                <LinkedInLogoIcon className="h-5 w-5" />
              </Link>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
