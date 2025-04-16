import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav className="p-2 flex justify-end">
          <a className="no-underline font-bold p-2" href="#hero">
            Home
          </a>
          <a className="no-underline font-bold p-2" href="#books">
            Books
          </a>
          <a
            className="no-underline font-bold p-2"
            href="https://docs.google.com/spreadsheets/d/1kHmzodxrGFzg5kxeySfrx7rixHIJsCOxClitApXHifI/edit?gid=0#gid=0"
          >
            Book Recs
          </a>
          <a className="no-underline font-bold p-2" href="#contact">
            Contact
          </a>
        </nav>
        {children}
      </body>
    </html>
  );
}
