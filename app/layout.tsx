import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import { Header } from "@/components/Header";
import { UserNameModal } from "@/components/UserNameModal";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Footer } from "@/components/footer";
import ServiceWorkerUpdater from "@/components/ServiceWorkerUpdate";
import PWAInstallPrompt from "@/components/pwa-install";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});

export const metadata: Metadata = {
  title: "Meu Diário",
  description:
    "Um diário pessoal para registrar seus pensamentos e sentimentos",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/icon512_rounded.png",
    apple: "/icon512_maskable.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${lora.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <UserNameModal />
          <div className="relative min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 pb-12">
              {children}
              <ServiceWorkerUpdater />
              <PWAInstallPrompt />
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
