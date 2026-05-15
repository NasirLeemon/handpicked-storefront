"use client";

import { useState } from "react";
import { getInventoryAuthClient } from "@/lib/supabase/inventory-auth";

const dashboardUrl =
  process.env.NEXT_PUBLIC_DASHBOARD_URL || "https://handpicked-dashboard.vercel.app";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");
    setIsSuccess(false);
    setIsLoading(true);

    try {
      const supabase = getInventoryAuthClient();

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error || !data.user?.email) {
        setMessage(error?.message || "Login failed.");
        return;
      }

      const { data: adminUser, error: adminError } = await supabase
        .from("admin_users")
        .select("email, role, active")
        .eq("email", data.user.email)
        .eq("active", true)
        .single();

      if (adminError || !adminUser) {
        await supabase.auth.signOut();
        setMessage("This email does not have dashboard access.");
        return;
      }

      setIsSuccess(true);
      setMessage("Login successful. You can open the dashboard now.");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong.";

      setMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-ivory px-4 py-10 text-deep-brown sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[70vh] max-w-xl items-center">
        <section className="w-full rounded-[1.75rem] border border-warm-border bg-soft-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-gold">
            Handpicked Admin
          </p>

          <h1 className="mt-3 font-serif-brand text-5xl font-medium tracking-[-0.04em] text-deep-brown">
            Admin Login
          </h1>

          <p className="mt-4 text-sm leading-7 text-soft-brown">
            Login with an approved admin account to access the Handpicked
            dashboard.
          </p>

          {!isSuccess ? (
            <form onSubmit={handleLogin} className="mt-7 grid gap-4">
              <label className="grid gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-soft-brown">
                  Email
                </span>

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="h-11 rounded-[1rem] border border-warm-border bg-ivory px-4 text-sm text-deep-brown outline-none transition focus:border-muted-gold"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-soft-brown">
                  Password
                </span>

                <input
                  type="password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="h-11 rounded-[1rem] border border-warm-border bg-ivory px-4 text-sm text-deep-brown outline-none transition focus:border-muted-gold"
                />
              </label>

              {message ? (
                <p className="rounded-[1rem] border border-muted-gold/30 bg-light-sand p-3 text-sm leading-6 text-soft-brown">
                  {message}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={isLoading}
                className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-[#4A3327] px-6 text-xs font-semibold uppercase tracking-[0.16em] !text-[#FFFDF9] shadow-sm transition hover:bg-[#6F5A49] disabled:cursor-not-allowed disabled:bg-taupe"
              >
                {isLoading ? "Checking..." : "Login"}
              </button>
            </form>
          ) : (
            <div className="mt-7 rounded-[1.5rem] border border-[#D9E0CE] bg-[#F5F7F0] p-5">
              <p className="text-sm leading-7 text-[#5B654A]">{message}</p>

              <a
                href={dashboardUrl}
                className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-full bg-[#4A3327] px-6 text-xs font-semibold uppercase tracking-[0.16em] !text-[#FFFDF9] shadow-sm transition hover:bg-[#6F5A49]"
              >
                Open Dashboard
              </a>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
