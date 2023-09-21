import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth} from "../firebase/firebase";
import {onAuthStateChanged, User } from "firebase/auth";

const AuthDetails = () => {
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState<User | null>(null); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => { 
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (authUser) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [authUser, navigate]);

  return null;
};

export default AuthDetails;
