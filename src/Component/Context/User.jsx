import { useContext, createContext, useState, useEffect } from "react";
import { getCookie, setCookie, hasCookie, deleteCookie } from "cookies-next";

const setUserCookie = newCookieUser => {
  const date = new Date();
  date.setTime(date.getTime() + 60 * 60 * 1000);
  setCookie("userName", newCookieUser.name, { expires: date });
  setCookie("userId", newCookieUser.id, { expires: date });
};

const getUserCookie = () => {
  if (hasCookie("userName")) {
    const userName = getCookie("userName");
    const userId = getCookie("userId");
    return { name: userName, id: userId };
  } else {
    return {};
  }
};

const clearUserCookie = () => {
  deleteCookie("userName");
  deleteCookie("userId");
};

const UserContext = createContext({
  user: {},
  logIn: user => {},
  logOut: () => {},
});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(getUserCookie());
  }, [setUser]);

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
      setUser(user);
      setUserCookie(user);
    } else {
      const { error } = await res.json();
      console.error(error);
    }
  };

  const logOut = () => {
    setUser({});
    clearUserCookie();
  };

  return <UserContext.Provider value={{ user, logIn, logOut }}>{children}</UserContext.Provider>;
};

const useUser = () => useContext(UserContext);

export default useUser;
