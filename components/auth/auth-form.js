import { signIn } from "next-auth/react";
import { useState } from "react";
import styles from "./auth-form.module.css";
import { useRouter } from 'next/router';

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignIn, setIsSignIn] = useState(true);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignIn) {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        console.error(result.error);
      } else {
        router.push('/');
      }
    } else {
      try {
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          setIsSignIn(true);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
    setEmail("");
    setPassword("");
  };

  return (
    <div className={styles.container}>
      <h1>{isSignIn ? "Sign In" : "Sign Up"}</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          id='email'
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="password"
          id='password'
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
      </form>
      <button onClick={toggleForm} className={styles.toggleButton}>
        {isSignIn ? 'Create new account' : 'Login with existing account'}
      </button>
    </div>
  );
}

