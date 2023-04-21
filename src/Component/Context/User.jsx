import { useContext, createContext, useState } from "react";

const UserContext = createContext({
  user: {},
  logIn: user => {},
  logOut: () => {},
});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const logIn = async user => {
    const res = await fetch(`api/user/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (res.status === 200) {
      const { user } = await res.json();
      console.log("user", user);
      setUser(user);
    } else {
      const { error } = await res.json();
      console.error(error);
    }
  };

  const logOut = () => {
    setUser({});
  };

  return <UserContext.Provider value={{ user, logIn, logOut }}>{children}</UserContext.Provider>;
};

const useUser = () => useContext(UserContext);

export default useUser;
