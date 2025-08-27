import { useState, useContext } from "react";
import { UserContext } from "../lib/user";

export default function LoginForm({ onSuccess }: { onSuccess?: () => void }) {
  // Registration state
  const [showRegister, setShowRegister] = useState(false);
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");
  const [registerLoading, setRegisterLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError("");
    setRegisterSuccess("");
    setRegisterLoading(true);
    try {
      const res = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: registerUsername,
          email: registerEmail,
          password: registerPassword,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setRegisterSuccess("Registration successful! You can now log in.");
        setRegisterUsername("");
        setRegisterEmail("");
        setRegisterPassword("");
        setShowRegister(false);
      } else {
        setRegisterError(data.error || "Registration failed");
      }
    } catch (err) {
      setRegisterError("Network error");
    } finally {
      setRegisterLoading(false);
    }
  };
  const { handleLogIn } = useContext(UserContext);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotUsername, setForgotUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [forgotError, setForgotError] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: loginUsername,
          password: loginPassword,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        handleLogIn(data, data.token); // Pass backend user info and token to context
        setSuccess("Login successful!");
        setError("");
        setLoginUsername("");
        setLoginPassword("");
        if (onSuccess) onSuccess();
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError("");
  };

  return (
    <div>
      {!showRegister && !showForgot && (
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
          {error && (
            <span className="text-red-500 text-sm text-center">{error}</span>
          )}
          {success && (
            <span className="text-green-600 text-sm text-center">
              {success}
            </span>
          )}
          <div className="flex gap-2 justify-end mt-4">
            <button
              type="submit"
              className="font-bold px-6 py-2 rounded-full bg-blue-200 text-black hover:bg-blue-300 border border-blue-200 shadow-sm transition-all duration-150 text-lg"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
          <div className="flex flex-col items-center mt-4">
            <span className="text-gray-600 text-base">
              Don't have an account?
            </span>
            <button
              type="button"
              className="mt-1 text-blue-600 hover:underline text-base font-semibold"
              onClick={() => setShowRegister(true)}
            >
              Sign up
            </button>
            <button
              type="button"
              className="mt-1 text-blue-600 hover:underline text-base font-semibold"
              onClick={() => setShowForgot(true)}
            >
              Forgot password?
            </button>
          </div>
        </form>
      )}
      {showRegister && (
        <form
          onSubmit={handleRegister}
          className="flex flex-col gap-4 mt-4 p-6 min-w-[300px] max-w-[400px] bg-white rounded-2xl shadow-lg border"
        >
          <h2 className="text-xl font-bold text-center mb-2">Sign Up</h2>
          <input
            type="text"
            placeholder="Username"
            value={registerUsername}
            onChange={(e) => setRegisterUsername(e.target.value)}
            className="border border-gray-200 rounded px-3 py-2 bg-white/80 focus:outline-none focus:ring-2 focus:ring-green-200 text-base shadow-sm"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
            className="border border-gray-200 rounded px-3 py-2 bg-white/80 focus:outline-none focus:ring-2 focus:ring-green-200 text-base shadow-sm"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
            className="border border-gray-200 rounded px-3 py-2 bg-white/80 focus:outline-none focus:ring-2 focus:ring-green-200 text-base shadow-sm"
            required
          />
          {registerError && (
            <span className="text-red-500 text-sm text-center">
              {registerError}
            </span>
          )}
          {registerSuccess && (
            <span className="text-green-600 text-sm text-center">
              {registerSuccess}
            </span>
          )}
          <div className="flex gap-2 justify-end mt-2">
            <button
              type="button"
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-base"
              onClick={() => setShowRegister(false)}
              disabled={registerLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-base"
              disabled={registerLoading}
            >
              {registerLoading ? "Signing up..." : "Sign Up"}
            </button>
          </div>
        </form>
      )}
      {showForgot && (
        <form
          onSubmit={handleForgotPassword}
          className="flex flex-col gap-2 mt-4 p-4 border rounded bg-gray-50 w-full"
        >
          <input
            type="text"
            placeholder="Username"
            value={forgotUsername}
            onChange={(e) => setForgotUsername(e.target.value)}
            className="border border-gray-200 rounded px-3 py-2 bg-white/80 text-base shadow-sm"
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border border-gray-200 rounded px-3 py-2 bg-white/80 text-base shadow-sm"
            required
          />
          <div className="flex gap-2 justify-end mt-2">
            <button
              type="button"
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-base"
              onClick={() => setShowForgot(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-base"
            >
              Change Password
            </button>
          </div>
          {forgotError && (
            <span className="text-red-500 text-sm text-center">
              {forgotError}
            </span>
          )}
          {forgotSuccess && (
            <span className="text-green-600 text-sm text-center">
              {forgotSuccess}
            </span>
          )}
        </form>
      )}
    </div>
  );
}
