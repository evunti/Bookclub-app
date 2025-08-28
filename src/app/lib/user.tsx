import { createContext, useState } from "react";

export const UserContext = createContext({
  id: null as number | null,
  username: "",
  email: "",
  isAdmin: false,
  isLoggedIn: false,
  token: "",
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
  const [token, setToken] = useState("");

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
    setToken(token);
  };

  const handleLogout = () => {
    setId(null);
    setUsername("");
    setIsLoggedIn(false);
    setIsAdmin(false);
    setEmail("");
    setToken("");
  };

  return (
    <UserContext.Provider
      value={{
        id,
        username,
        email,
        isAdmin,
        isLoggedIn,
        token,
        handleLogIn,
        handleLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
