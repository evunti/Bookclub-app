import { createContext, useState } from "react";

export const UserContext = createContext({
  email: "",
  isAdmin: false,
  isLoggedIn: false,
  handleLogIn: () => {},
});

export function UserProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogIn = () => {
    setIsLoggedIn(true);
    setIsAdmin(true);
  };

  return (
    <UserContext.Provider
      value={{
        isAdmin: isAdmin,
        email: email,
        isLoggedIn: isLoggedIn,
        handleLogIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
