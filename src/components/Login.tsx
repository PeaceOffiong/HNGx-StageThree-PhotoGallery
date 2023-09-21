import { useState } from "react";
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import {useNavigate} from "react-router-dom";

interface ErrorState {
  passwordEmail: string;
  emailError: string;
}

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const [error, setError] = useState<ErrorState>({
    passwordEmail: "",
    emailError: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      const user = userCredential.user;
      console.log(user)
      navigate("/")
    }).catch((error) =>{
      console.log(error);
    });
  };

  return (
    <main className="loginPage">
      <form onSubmit={handleSubmit}>
        <h1>Login </h1>
        <input
          type="text"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" />
      </form>
    </main>
  );
};

export default Login;
