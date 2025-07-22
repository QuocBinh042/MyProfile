import './globals.css';

export const metadata = {
  title: "Trần Lê Quốc Bình",
  description: "Trang portfolio cá nhân của Trần Lê Quốc Bình - Lập trình viên, sinh viên IUH.",
  openGraph: {
    title: "Trần Lê Quốc Bình",
    description: "Trang portfolio cá nhân của Trần Lê Quốc Bình - Lập trình viên, sinh viên IUH.",
    url: "https://quocbinhdev.vercel.app/",
    siteName: "Trần Lê Quốc Bình",
    images: [
      {
        url: "/image/og-image.png",
        width: 1200,
        height: 630,
        alt: "Portfolio Trần Lê Quốc Bình",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trần Lê Quốc Bình",
    description: "Trang portfolio cá nhân của Trần Lê Quốc Bình - Lập trình viên, sinh viên IUH.",
    images: ["/images/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-amber-50">{children}</body>
    </html>
  );
}
