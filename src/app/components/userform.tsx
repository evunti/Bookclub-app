import { useState } from "react";

interface UserFormProps {
  onSubmit: (data: {
    username: string;
    email: string;
    password: string;
  }) => void;
  onCancel: () => void;
  initialData?: {
    username: string;
    email: string;
    password: string;
  };
}

export default function UserForm({
  onSubmit,
  onCancel,
  initialData,
}: UserFormProps) {
  const [username, setUsername] = useState(initialData?.username || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [password, setPassword] = useState(initialData?.password || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // You can add API call here if needed
      onSubmit({ username, email, password });
    } catch (err) {
      setError("Failed to register");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-6 min-w-[300px] max-w-[400px] bg-white rounded-2xl shadow-lg"
    >
      <h2 className="text-xl font-bold text-center mb-2">Sign Up</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border border-gray-200 rounded px-3 py-2 bg-white/80 focus:outline-none focus:ring-2 focus:ring-green-200 text-base shadow-sm"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-gray-200 rounded px-3 py-2 bg-white/80 focus:outline-none focus:ring-2 focus:ring-green-200 text-base shadow-sm"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border border-gray-200 rounded px-3 py-2 bg-white/80 focus:outline-none focus:ring-2 focus:ring-green-200 text-base shadow-sm"
        required
      />
      {error && (
        <span className="text-red-500 text-sm text-center">{error}</span>
      )}
      <div className="flex gap-2 justify-end mt-2">
        <button
          type="button"
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-base"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-base"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </div>
    </form>
  );
}
