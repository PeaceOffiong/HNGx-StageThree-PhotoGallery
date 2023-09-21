import { useState } from "react";
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const [error, setError] = useState<string>("");
  console.log(error);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
          setError(error.message);
        });
      setPassword("");
      setEmail("");
    } catch (error) {
      console.log(error);
      setError("Please check that your internet is connected");
    }
  };

  return (
    <main className="loginPage">
      <form onSubmit={handleSubmit}>
        <h1>Login </h1>
        <p>Welcome Back</p>
        <div className="error">{error}</div>
        <input
          type="email"
          placeholder="Enter your Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" className="submit" />
      </form>
    </main>
  );
};

export default Login;
