import type { Metadata } from "next";
import { Noto_Serif_Georgian, Noto_Sans_Georgian } from "next/font/google";
import { WEDDING_DATA } from "@/constants/wedding-data";
import "./globals.css";

const notoSerif = Noto_Serif_Georgian({
  variable: "--font-cormorant",
  subsets: ["georgian"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const notoSans = Noto_Sans_Georgian({
  variable: "--font-jost",
  subsets: ["georgian"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${WEDDING_DATA.couple.partner1} & ${WEDDING_DATA.couple.partner2} | ქორწილის მოწვევა`,
  description: `თქვენ მოწვეული ხართ ${WEDDING_DATA.couple.partner1}-ისა და ${WEDDING_DATA.couple.partner2}-ის ქორწილზე, ${WEDDING_DATA.dateFormatted}-ს.`,
  keywords: [
    "ქორწილის მოწვევა",
    "ციფრული მოწვევა",
    WEDDING_DATA.couple.partner1,
    WEDDING_DATA.couple.partner2,
  ],
  openGraph: {
    title: `${WEDDING_DATA.couple.partner1} & ${WEDDING_DATA.couple.partner2}`,
    description: WEDDING_DATA.couple.tagline,
    type: "website",
    locale: "ka_GE",
    images: [
      {
        url: "/uploads/couple-3.jpg",
        width: 1200,
        height: 630,
        alt: "ქორწილის მოწვევა",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${WEDDING_DATA.couple.partner1} & ${WEDDING_DATA.couple.partner2}`,
    description: WEDDING_DATA.couple.tagline,
    images: ["/uploads/couple-3.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ka"
      className={`${notoSerif.variable} ${notoSans.variable} h-full`}
      data-theme="dark"
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
