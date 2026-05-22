import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ui } from "@clerk/ui";
import { dark } from "@clerk/ui/themes";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ghost AI",
  description: "Design systems, reimagined.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ClerkProvider
          ui={ui}
          afterSignOutUrl="/sign-in"
          appearance={{
            theme: [dark],
            variables: {
              colorBackground: "var(--bg-surface)",
              colorNeutral: "var(--text-secondary)",
              colorPrimary: "var(--accent-primary)",
              colorPrimaryForeground: "#080809",
              colorForeground: "var(--text-secondary)",
              colorInputForeground: "var(--text-secondary)",
              colorInput: "var(--bg-subtle)",
            },
            elements: {
              card: "shadow-none w-full",
              headerTitle: "text-text-secondary",
              headerSubtitle: "text-text-muted",
              socialButtonsBlockButton:
                "border-border-default bg-surface hover:bg-elevated text-text-secondary",
              dividerLine: "bg-border-default",
              dividerText: "text-text-faint",
              formFieldLabel: "text-text-muted",
              formFieldInput:
                "bg-subtle border-border-default text-text-secondary",
              footerActionText: "text-text-muted",
              footerActionLink: "text-accent-primary hover:text-brand",
              formButtonPrimary:
                "bg-brand text-[#080809] hover:opacity-90",
            },
          }}
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
