import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    name: "Justin Nabunturan",
    email: "justin@ustp.edu.ph",
    student_id: "2019123456",
    isVerified: false,
    isPending: false,
  });

  const submitForVerification = () => {
    setUser(prev => ({ ...prev, isPending: true }));
  };

  return (
    <UserContext.Provider value={{
      user,
      isVerified: user.isVerified,
      isPending: user.isPending,
      submitForVerification
    }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
