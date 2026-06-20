import { useState } from "react";
import { useAdminAuth } from "./hooks/useAdminAuth";
import { Lock, Mail, ArrowRight } from "lucide-react";
import { apiUrl } from "../config/api.js";

export default function AdminLogin({ onLoggedIn }) {
  const { login } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch(apiUrl("/api/admin/login"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid credentials.");
      }

      login(data.token, data.email || email.trim());
      onLoggedIn?.();
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#f8f3eb] px-4">
      <div className="w-full max-w-md rounded-2xl border border-[#e6ded0] bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-[#f0eadf] text-[#a78d67]">
            <Lock size={22} />
          </div>
          <h1 className="font-serif text-2xl font-bold text-[#151412]">Admin Portal</h1>
          <p className="mt-2 text-sm text-[#8c806f]">Sign in to manage your portfolio</p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-black uppercase tracking-[0.18em] text-[#8c806f] mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-4 w-4 text-[#8c806f]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                disabled={loading}
                className="h-12 w-full rounded-md border border-[#e9e2d7] bg-white pl-10 pr-4 text-sm outline-none transition focus:border-[#a78d67] disabled:opacity-60"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-[0.18em] text-[#8c806f] mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-4 w-4 text-[#8c806f]" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={loading}
                className="h-12 w-full rounded-md border border-[#e9e2d7] bg-white pl-10 pr-4 text-sm outline-none transition focus:border-[#a78d67] disabled:opacity-60"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#151412] text-sm font-semibold text-white transition hover:bg-[#a78d67] disabled:cursor-not-allowed disabled:opacity-75"
          >
            {loading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <>
                Sign In <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
