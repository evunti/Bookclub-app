"use client";
import "./globals.css";
import { useState, createContext } from "react";

export const AdminContext = createContext(false);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Admin login state
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginUsername === "admin" && loginPassword === "password") {
      setIsAdmin(true);
      setShowLogin(false);
      setLoginError("");
      setLoginUsername("");
      setLoginPassword("");
    } else {
      setLoginError("Invalid credentials");
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
  };

  return (
    <html lang="en">
      <head>
        <script
          crossOrigin="anonymous"
          src="//unpkg.com/react-scan/dist/auto.global.js"
        ></script>
      </head>
      <body>
        <AdminContext.Provider value={isAdmin}>
          <nav className="p-2 flex justify-end items-center gap-2 relative">
            <a className="no-underline font-bold p-2" href="#hero">
              Home
            </a>
            <a className="no-underline font-bold p-2" href="#books">
              Books
            </a>
            {/* <a
              className="no-underline font-bold p-2"
              // href="https:/docs.google.com/spreadsheets/d/1kHmzodxrGFzg5kxeySfrx7rixHIJsCOxClitApXHifI/edit?gid=0#gid=0"
            >
              Book Recs
            </a> */}
            <a className="no-underline font-bold p-2" href="#contact">
              Contact
            </a>
            {isAdmin ? (
              <button
                className="no-underline font-bold p-2 bg-white/80 text-black rounded-lg shadow hover:bg-gray-200 border border-gray-300 ml-2 transition-colors"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <button
                className="no-underline font-bold p-2 bg-white/80 text-black rounded-lg shadow hover:bg-gray-200 border border-gray-300 ml-2 transition-colors"
                onClick={() => setShowLogin(true)}
              >
                Login
              </button>
            )}
            {showLogin && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                <div className="bg-white/95 border rounded-2xl shadow-2xl p-6 min-w-[240px] animate-fade-in relative">
                  <form onSubmit={handleLogin} className="flex flex-col gap-3">
                    <input
                      type="text"
                      placeholder="Username"
                      value={loginUsername}
                      onChange={(e) => setLoginUsername(e.target.value)}
                      className="border border-gray-200 rounded-full px-3 py-2 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-200 text-base shadow-sm"
                      autoFocus
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="border border-gray-200 rounded-full px-3 py-2 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-200 text-base shadow-sm"
                    />
                    {loginError && (
                      <span className="text-red-500 text-xs text-center">
                        {loginError}
                      </span>
                    )}
                    <div className="flex gap-2 justify-end mt-2">
                      <button
                        type="submit"
                        className="font-bold px-4 py-2 rounded-full bg-blue-200 text-black hover:bg-blue-300 border border-blue-200 shadow-sm transition-all duration-150"
                      >
                        Login
                      </button>
                      <button
                        type="button"
                        className="font-bold px-4 py-2 rounded-full bg-gray-100 text-black hover:bg-gray-200 border border-gray-200 shadow-sm transition-all duration-150"
                        onClick={() => setShowLogin(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                  <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl font-bold focus:outline-none"
                    onClick={() => setShowLogin(false)}
                    aria-label="Close"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}
          </nav>
          {children}
        </AdminContext.Provider>
      </body>
    </html>
  );
}
