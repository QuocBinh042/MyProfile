import './globals.css';

export const metadata = {
  title: 'Portfolio | Trần Lê Quốc Bình',
  description: 'Trang giới thiệu bản thân và dự án của Trần Lê Quốc Bình.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-amber-50">{children}</body>
    </html>
  );
}
