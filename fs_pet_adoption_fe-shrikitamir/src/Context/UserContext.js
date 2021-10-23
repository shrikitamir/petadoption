import React, { useEffect, useState } from "react";
import localForage from "localforage";
import axios from "axios";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    (async () => {
      const token = await localForage.getItem("token");
      if (!token) return;
      axios.defaults.headers.common["authorization"] = token;
      const user = await axios.get(
        `${process.env.REACT_APP_API_HOSTNAME}/auth/login`
      );
      if (user.data) {
        const { email, firstName, lastName, phone, bio, isAdmin, userId, img } =
          user.data;
        let admin = false;
        if (isAdmin === 1) {
          admin = true;
        }
        setCurrentUser({
          userId: userId,
          email: email,
          firstName: firstName,
          lastName: lastName,
          phone: phone,
          bio: bio,
          img: img,
          isAdmin: admin,
        });
      } else {
        setCurrentUser(null);
      }
    })();
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};
