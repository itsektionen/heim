import { CommandMenu } from "@/components/cmd-menu";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TRPCProvider } from "@/components/providers/trpc-provider";
import { VimNavigation } from "@/components/vim-navigation";
import type { Metadata } from "next";
import { Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "The IT Chapter",
  description:
    "The Chapter for Information Technology at the Royal Institute of Technology (KTH) in Stockholm, Sweden.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${geistMono.variable} antialiased`}>
        <TRPCProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            storageKey="theme-kthit"
            disableTransitionOnChange
          >
            <Navbar />
            <main className="container mx-auto p-6 sm:border-x pb-42">
              {children}
            </main>
            <Footer />
            <CommandMenu />
            <VimNavigation />
          </ThemeProvider>
        </TRPCProvider>
      </body>
    </html>
  );
}
