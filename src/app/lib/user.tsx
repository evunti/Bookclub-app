import { createContext, useState } from "react";

// Update context to accept user info and id
export const UserContext = createContext({
  id: null as number | null,
  username: "",
  email: "",
  isAdmin: false,
  isLoggedIn: false,
  handleLogIn: (_user: any) => {},
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

  // Accept user object from backend
  const handleLogIn = (user: {
    id: number;
    username: string;
    isAdmin: boolean;
    email?: string;
  }) => {
    setId(user.id);
    setUsername(user.username);
    setIsAdmin(!!user.isAdmin);
    setEmail(user.email || "");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setId(null);
    setUsername("");
    setIsLoggedIn(false);
    setIsAdmin(false);
    setEmail("");
  };

  return (
    <UserContext.Provider
      value={{
        id,
        username,
        email,
        isAdmin,
        isLoggedIn,
        handleLogIn,
        handleLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
