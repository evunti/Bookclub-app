"use client";
import "./globals.css";
import { useState, createContext, useContext } from "react";
import { UserContext, UserProvider } from "./lib/user";
import LoginForm from "./components/login";

function NavBar({ onLoginClick }: { onLoginClick: () => void }) {
  const { isLoggedIn, handleLogout } = useContext(UserContext);

  return (
    <nav className="p-2 flex justify-end items-center gap-2 relative">
      <a className="no-underline font-bold p-2" href="#hero">
        Home
      </a>
      <a className="no-underline font-bold p-2" href="#books">
        Books
      </a>
      <a className="no-underline font-bold p-2" href="#contact">
        Contact
      </a>
      {isLoggedIn ? (
        <button
          className="no-underline font-bold p-2 bg-white/80 text-black rounded-lg shadow hover:bg-gray-200 border border-gray-300 ml-2 transition-colors"
          onClick={handleLogout}
        >
          Logout
        </button>
      ) : (
        <button
          className="no-underline font-bold p-2 bg-white/80 text-black rounded-lg shadow hover:bg-gray-200 border border-gray-300 ml-2 transition-colors"
          onClick={onLoginClick}
        >
          Login
        </button>
      )}
    </nav>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <html lang="en">
      <body>
        <UserProvider>
          <NavBar onLoginClick={() => setShowLogin(true)} />
          {showLogin && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
              <div className="bg-white/95 border rounded-2xl shadow-2xl p-6 min-w-[240px] animate-fade-in relative">
                <button
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl font-bold focus:outline-none"
                  onClick={() => setShowLogin(false)}
                  aria-label="Close"
                >
                  ×
                </button>
                <LoginForm onSuccess={() => setShowLogin(false)} />
              </div>
            </div>
          )}
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
