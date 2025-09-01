import "./globals.css";

export const metadata = {
  title: "School Directory",
  description: "Mini project with Next.js + MySQL",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
