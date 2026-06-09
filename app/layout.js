import "./globals.css";

export const metadata = {
  title: "Users Explorer",
  description: "Browse users, mark favorites, and read their posts.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
