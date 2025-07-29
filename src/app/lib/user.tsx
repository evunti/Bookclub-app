import { createContext, useState } from "react";

// Update context to accept user info and id
export const UserContext = createContext({
  id: null as number | null,
  username: "",
  email: "",
  isAdmin: false,
  isLoggedIn: false,
  token: "", // Add token to context
  handleLogIn: (_user: any, _token: string) => {},
  handleLogout: () => {},
});

export function UserProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [id, setId] = useState<number | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(""); // Add token state

  // Accept user object and token from backend
  const handleLogIn = (
    user: {
      id: number;
      username: string;
      isAdmin: boolean;
      email?: string;
    },
    token: string
  ) => {
    setId(user.id);
    setUsername(user.username);
    setIsAdmin(!!user.isAdmin);
    setEmail(user.email || "");
    setIsLoggedIn(true);
    setToken(token); // Store token
  };

  const handleLogout = () => {
    setId(null);
    setUsername("");
    setIsLoggedIn(false);
    setIsAdmin(false);
    setEmail("");
    setToken(""); // Clear token
  };

  return (
    <UserContext.Provider
      value={{
        id,
        username,
        email,
        isAdmin,
        isLoggedIn,
        token, // Provide token
        handleLogIn,
        handleLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
