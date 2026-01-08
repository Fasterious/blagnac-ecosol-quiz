import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quiz EcoSol Blagnac 2026",
  description: "Découvrez votre compatibilité avec le programme EcoSol pour les municipales 2026 à Blagnac via ce mini quiz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}


