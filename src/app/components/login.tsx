import { useState, useContext } from "react";
import { UserContext } from "../lib/user";

export default function LoginForm({ onSuccess }: { onSuccess?: () => void }) {
  const { handleLogIn } = useContext(UserContext);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginUsername === "admin" && loginPassword === "password") {
      handleLogIn();
      setLoginError("");
      setLoginUsername("");
      setLoginPassword("");
      if (onSuccess) onSuccess();
    } else {
      setLoginError("Invalid credentials");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col gap-5 p-8 min-w-[350px] max-w-[400px] bg-white rounded-2xl shadow-lg"
    >
      <h2 className="text-2xl font-bold text-center mb-2">Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={loginUsername}
        onChange={(e) => setLoginUsername(e.target.value)}
        className="border border-gray-200 rounded-full px-4 py-3 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-200 text-lg shadow-sm"
        autoFocus
      />
      <input
        type="password"
        placeholder="Password"
        value={loginPassword}
        onChange={(e) => setLoginPassword(e.target.value)}
        className="border border-gray-200 rounded-full px-4 py-3 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-200 text-lg shadow-sm"
      />
      {loginError && (
        <span className="text-red-500 text-sm text-center">{loginError}</span>
      )}
      <div className="flex gap-2 justify-end mt-4">
        <button
          type="submit"
          className="font-bold px-6 py-2 rounded-full bg-blue-200 text-black hover:bg-blue-300 border border-blue-200 shadow-sm transition-all duration-150 text-lg"
        >
          Login
        </button>
      </div>
      <div className="flex flex-col items-center mt-4">
        <span className="text-gray-600 text-base">Don't have an account?</span>
        <button
          type="button"
          className="mt-1 text-blue-600 hover:underline text-base font-semibold"
          // onClick={handleSignUp} // Implement sign up modal or navigation
        >
          Sign up
        </button>
      </div>
    </form>
  );
}
