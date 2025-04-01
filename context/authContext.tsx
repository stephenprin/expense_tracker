import { auth, firestore } from "@/config/firebase";
import { AuthContextType, UserDataType, UserType } from "@/type";
import { doc, getDoc, setDoc } from "@firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { createContext } from "react";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = React.useState<UserType | null>(null);
  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error: any) {
      const msg = error.message;
      return { success: false, msg };
    }
  };
  const register = async (email: string, password: string, name: string) => {
    console.log("Email", email);
    try {
      if (!email || !password || !name) {
        throw new Error("All fields (email, password, name) are required");
      }

      // Ensure email format is valid
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error("Invalid email format");
      }

      let response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(firestore, "users", response.user.uid), {
        name,
        email,
        uid: response.user.uid,
      });

      return { success: true };
    } catch (error: any) {
    
      if (error.code === "auth/invalid-email") {
        return { success: false, msg: "Please enter a valid email address." };
      } else if (error.code === "auth/email-already-in-use") {
        return { success: false, msg: "This email is already registered." };
      } else if (error.code === "auth/weak-password") {
        return {
          success: false,
          msg: "Password should be at least 6 characters.",
        };
      }

      return { success: false, msg: error.message };
    }
  };

  const updateUserData = async (userId: string) => {
    try {
      const docRef = doc(firestore, "users", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const userData: UserType = {
          uid: data.uid,
          email: data.email || null,
          name: data.name || null,
          image: data.image || null,
        };
        setUser({ ...userData });
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const contextValue: AuthContextType = {
    user,
    setUser,
    login,
    register,
    updateUserData,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
